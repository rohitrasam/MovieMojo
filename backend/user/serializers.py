from rest_framework.serializers import ModelSerializer
from models.models import AppUser


class AppUserSerializer(ModelSerializer):

    class Meta:
        model = AppUser
        fields = ['email', 'first_name', 'last_name', 'phone_no', 'password']
        extra_kwargs = {
            'password':{'write_only': True}
        }
    
    def create(self, validated_data: dict):
        
        return self.Meta.model.objects.create_user(**validated_data)
    
