from django.urls import path
from . import views

urlpatterns = [
    path('NewsList/<slug:ori_type>', views.news_list),
    path('NewsList/details/<int:newsid>/comment',views.view_news),
    path('PublishNews/',views.publish_news),
]
