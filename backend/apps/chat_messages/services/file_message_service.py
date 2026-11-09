from uuid import UUID
from django.db import transaction

from apps.chat_messages.dtos import (
    MessageResponse,
    SendFileMessageResponse,
    FileResponse,
    SendFileMessageRequest
)
from apps.chat_messages.models.file_message_models import FileMessage
from apps.chats.models import Chat
from apps.chat_messages.enums import MessageType, SenderType
from apps.file_assets.models import FileAsset
from apps.chat_participants.models import ChatParticipant
from apps.file_assets.file_service import FileService
from shared.exceptions.chat.common import (
    ChatAccessDeniedException,
    ChatNotFoundException,
)
from .message_service import MessageService

class FileMessageService:

    @staticmethod
    def add_file_message(
        chat_id: UUID,
        user_id: UUID,
        dto: SendFileMessageRequest,
    ) -> SendFileMessageResponse:
        """
        Add file messages and optional text content to the chat
        """
        chat = Chat.objects.get_chat_by_id(chat_id)

        if not chat:
            raise ChatNotFoundException()

        is_participant = ChatParticipant.objects.is_participant(chat_id, user_id)

        if not is_participant:
            raise ChatAccessDeniedException()

        files = FileAsset.objects.get_active_by_ids(dto.file_ids)
        files = FileService.validate_uploaded_file(files, user_id)

        responses: list[MessageResponse] = []

        with transaction.atomic():
            if dto.text_content is not None:
                text = MessageService.create_message(
                    chat_id=chat_id,
                    user_id=user_id,
                    message_type=MessageType.TEXT,
                    sender_type=SenderType.USER,
                    text_content=dto.text_content,
                    reply_to_message=dto.reply_to_message,
                )
                responses.append(MessageResponse(
                    id=text.id,
                    chat=text.chat_id,
                    user=text.user_id,
                    message_type=text.message_type,
                    sender_type=text.sender_type,
                    text_content=text.text_content,
                    reply_to_message=text.reply_to_message_id,
                    created_at=text.created_at,
                ))

            for file in files:
                document = MessageService.create_message(
                    chat_id=chat_id,
                    user_id=user_id,
                    text_content=None,
                    message_type=MessageType.FILE,
                    sender_type=SenderType.USER,
                    reply_to_message=dto.reply_to_message,
                )

                FileMessage.objects.create_file_message(
                    file_asset_id=file.id,
                    message_id=document.id,
                )

                responses.append(MessageResponse(
                    id=document.id,
                    chat=document.chat_id,
                    user=document.user_id,
                    message_type=document.message_type,
                    sender_type=document.sender_type,
                    file=FileResponse(
                        file_asset_id=file.id,
                        original_name=file.original_name,
                        file_size=file.file_size,
                    ),
                    reply_to_message=document.reply_to_message_id,
                    created_at=document.created_at,
                ))

        return SendFileMessageResponse(messages=responses)