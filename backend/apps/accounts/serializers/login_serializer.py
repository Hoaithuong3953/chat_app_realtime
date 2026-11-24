from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    """Login request serializer"""
    identifier = serializers.CharField(
        min_length=1,
        error_messages={
            "blank": "Email or username are required",
        },
    )
    password = serializers.CharField(
        min_length=1,
        write_only=True,
        error_messages={
            "blank": "Password is required.",
        },
    )

    def validate_identifier(self, value: str) -> str:
        """Normalize identifier input"""
        return value.strip().lower()