from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny

from todo_app.models import UserModel, Todo
from todo_app.serializers import CustomTokenObtainPairSerializer, UserSerializer, \
    LoginSerializer, TodoSerializer
from drf_yasg.inspectors import SwaggerAutoSchema


class OnboardingAutoSchema(SwaggerAutoSchema):
    def get_tags(self, operation_keys=None):
        return ['Onboarding APIs']


class TodosAutoSchema(SwaggerAutoSchema):
    def get_tags(self, operation_keys=None):
        return ['Todos APIs']


class RegistrationView(generics.GenericAPIView):
    swagger_schema = OnboardingAutoSchema
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def post(self, request):
        '''
        Create a user account
        '''
        data = request.data

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)


class UserLoginView(generics.GenericAPIView):
    swagger_schema = OnboardingAutoSchema
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        '''
        Login User and get access token
        '''
        data = request.data

        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        token = CustomTokenObtainPairSerializer.get_token(user, request)
        return Response({
            'token': token,
            'msg': 'Login Success'
        }, status=status.HTTP_200_OK)


class ProfileView(generics.RetrieveUpdateAPIView):
    swagger_schema = OnboardingAutoSchema
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        queryset = UserModel.objects.get(id=self.request.user.id)
        return queryset


class TodoListCreateAPI(generics.ListCreateAPIView):
    swagger_schema = TodosAutoSchema
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoRetrieveUpdateDestroyAPI(generics.RetrieveUpdateDestroyAPIView):
    swagger_schema = TodosAutoSchema
    permission_classes = [IsAuthenticated]
    serializer_class = TodoSerializer

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

