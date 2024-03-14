from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from todo_app.models import UserModel, Todo


class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'is_superuser', 'is_verified')
    list_filter = ('is_superuser',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name',)}),
        ('Permissions', {'fields': ('is_superuser', 'is_active', 'is_verified',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    search_fields = ('id', 'email',)
    ordering = ('email', 'id')
    filter_horizontal = ()

admin.site.register(UserModel, UserModelAdmin)


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'completed', 'created_at')

