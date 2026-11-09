from django.urls import path
from apps.chat_messages.views import (
    MessageView,
    MessageRecallView,
    FileMessageView,
)

urlpatterns = [
    path("", MessageView.as_view(), name="messages"),
    path("<uuid:message_id>/recall", MessageRecallView.as_view(), name="recall-message"),
    path("file", FileMessageView.as_view(), name="file-message"),
]