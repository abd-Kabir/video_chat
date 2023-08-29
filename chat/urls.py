from django.urls import path

from chat.views import main_view

app_name = 'chat'
urlpatterns = [
    path('', main_view, name='main-view')
]
