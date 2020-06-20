from django.urls import path
from . import views

urlpatterns = [
    path('Newsdetails', views.view_news),
    path('NewsList/<slug:ori_type>', views.news_list),
    path('NewsList/details/<int:newsid>/comment',views.publish_comment),
    path('PublishNews',views.publish_news),
    path('Delnews',views.del_news),
    
]
