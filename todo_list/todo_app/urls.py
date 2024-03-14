from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from todo_app.views import RegistrationView, UserLoginView, \
    ProfileView, TodoListCreateAPI, TodoRetrieveUpdateDestroyAPI


urlpatterns = [
    path('register/', RegistrationView.as_view()),
    path('login/', UserLoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('token/', TokenRefreshView.as_view()),
    path('todos/', TodoListCreateAPI.as_view()),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroyAPI.as_view()),
]