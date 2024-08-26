from rest_framework.serializers import ModelSerializer, BooleanField
from models.models import AppUser


class AppUserSerializer(ModelSerializer):

    isAdmin = BooleanField(default=False)

    class Meta:
        model = AppUser
        fields = ['email', 'first_name', 'last_name', 'phone_no', 'password', 'isAdmin']
        extra_kwargs = {
            'password':{'write_only': True}
        }
    
    def create(self, validated_data: dict):
        if validated_data["isAdmin"]:
            return self.Meta.model.objects.create_admin(**validated_data)
        
        return self.Meta.model.objects.create_user(**validated_data)
    
