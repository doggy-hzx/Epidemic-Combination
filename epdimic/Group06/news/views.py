import json
import time

from django.contrib.auth.models import Group, User
from django.db.models import Avg, Count, Max, Min, Sum
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
# from rest_framework.views import APIView
#from rest_framework.response import Response
from . import models
from Group06.users import decorators
from Group06.users import models as usermodels

# Create your views here.

banned_word_list = ['这里是一些违禁词']

# 发布新闻


@decorators.group_required('admin_1')
def publish_news(request):
    if request.method == 'publish_news':
        '''发布新闻
        '''
        # 检查权限
        # try:
        #     user_info = models.UserInfo.objects.get(
        #         username=request.user.username)
        #     user_group = Group.objects.get(user=user_info)
        # except models.UserInfo.DoesNotExist:
        #     return HttpResponse("请使用疫情新闻发布子系统管理员账号登录")

        # 获取新闻数据
        if True:  # user_group == 'admin_1':  # 等一个接口用法
            News_content = json.loads(request.body)

            UserName = News_content['username']
            User_id = usermodels.UserInfo.objects.get(username=UserName)

            News_id = models.News.objects.aggregate(Max('news_id'))[
                'news_id__max']
            if News_id is None:
                News_id = 1
            else:
                News_id = News_id+1
            News_title = News_content['news_title']
            News_url = News_content['news_content']
            News_gen_time = time.strftime(
                "%Y-%m-%d %H:%M:%S", time.localtime())
            Col_id = News_content['cl_id']
            # 插入新闻表
            news_val = models.News.objects.create(news_id=News_id, news_title=News_title, news_url=News_url,
                                                  news_gen_time=News_gen_time, view_num=0, share_num=0, cmt_num=0)
            # 插入栏目关系表
            news_col_id = models.NewsColumn.objects.aggregate(
                Max('news_cl_id'))['news_cl_id']
            if news_col_id is None:
                news_col_id = 1
            else:
                news_col_id = news_col_id+1

            news_col_val = models.NewsColumn.objects.create(
                news_cl_id=news_col_id, news_id=News_id, cl_id=Col_id)

            # 插入管理员发布新闻表
            Pub_news_id = models.PublishNews.objects.aggregate(
                Max('pub_news_id'))['pub_news_id__max']
            if Pub_news_id is None:
                Pub_news_id = 1
            else:
                Pub_news_id = Pub_news_id+1

            news_cmt_val = models.PublishNews.objects.create(
                pub_news_id=Pub_news_id, user_id=User_id, news_id=News_id)

            # 接下来处理可能存在的图片
            img_url = News_title = News_content['img_path']
            Img_id = models.Images.objects.aggregate(Max('img_id'))[
                'img_id__max']
            if Img_id is None:
                Img_id = 1
            else:
                Img_id = Img_id+1
            img_val = models.Images.objects.create(
                img_id=Img_id, img_name='null', img_title='null', img_path=img_url)
            # 插入新闻信息表
            news_img_id = models.NewsImages.objects.aggregate(Max('news_files_id'))[
                'news_files_id__max']
            if news_img_id is None:
                news_img_id = 1
            else:
                news_img_id = news_img_id+1
            NIrelation = models.NewsImages.objects.create(
                news_files_id=news_img_id, img_id=Img_id, news_id=News_id)
        # else:
            # return HttpResponse("请使用疫情新闻发布子系统管理员账号登录")

        return HttpResponseRedirect('发布成功')

# 发表评论


#@decorators.login_required
def publish_comment(request):
    # # 获取内容
    # try:
    #     Comm = json.loads(request.body)

    #     UserName = Comm['user']
    #     User_id = usermodels.UserInfo.objects.get(username=UserName)
    #     Cmt_content = Comm['com']
    #     newsid=Comm['num']
    # except usermodels.UserInfo.DoesNotExist:
    #     return HttpResponse("发布失败")  # 发布失败
    UserName='doggy'
    user_obj = usermodels.UserInfo.objects.get(username=UserName)
    User_id=user_obj.id
    Cmt_content='aaaaaaaaaaaaaaaaaaaa'
    newsid=1

    # 检查评论违禁词
    for word in banned_word_list:
        if word in Cmt_content:
            return HttpResponse("发布失败，评论包含非法内容")

    Comment_id = models.Comment.objects.aggregate(Max('cmt_id'))[
        'cmt_id__max']
    if Comment_id is None:
        Comment_id=1
    else:
        Comment_id=Comment_id+1

    is_Reliable = 3
    Cmt_add_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    # 插入评论表
    comm_obj = models.Comment.objects.create(
        cmt_id=Comment_id, is_reliable=is_Reliable, cmt_content=Cmt_content, cmt_gen_time=Cmt_add_time, like_num=0)

    # 插入新闻评论关系表
    newsComm_id = models.NewsComments.objects.aggregate(Max('news_cmt_id'))[
        'news_cmt_id__max']
    if newsComm_id is None:
        newsComm_id=1
    else:
        newsComm_id=newsComm_id+1

    ref_news=models.News.objects.get(news_id=newsid)

    comm_relation = models.NewsComments.objects.create(
        news_cmt_id=newsComm_id, cmt_id=comm_obj, news_id=ref_news)

    # 插入用户评论关系表
    Pub_cmt_id = models.PublishComments.objects.aggregate(Max('pub_cmt_id'))[
        'pub_cmt_id__max']
    if Pub_cmt_id is None:
        Pub_cmt_id=1
    else:
        Pub_cmt_id=Pub_cmt_id+1

    

    comm_user = models.PublishComments.objects.create(
        pub_cmt_id=Pub_cmt_id, user_id=user_obj, cmt_id=comm_obj)

    return HttpResponse("评论成功")

# 查看新闻


def view_news(request):
    # 获取新闻id和评论id
    newsobj = json.loads(request.body)
    newsid=newsobj['num']
    cmtlist = []
    try:
        cmt_gets = models.NewsComments.objects.filter(news_id=newsid)
        news_cont = models.News.objects.get(news_id=newsid)
    except:
        HttpResponse("不存在该新闻")

    for cmt in cmt_gets:
        cmtid = cmt.cmt_id.cmt_id  # 找到评论id
        cmtinfo = models.Comment.objects.get(cmt_id=cmtid)  # 获取评论内容
        if cmtinfo.is_reliable == 3:
            cmt_item = {}
            cmt_item['com'] = cmtinfo.cmt_content

            rela = models.PublishComments.objects.get(cmt_id=cmtid)
            cmt_item['title'] = rela.user_id.username

            cmtlist.append(cmt_item)

    newsPage = {'cmts': cmtlist, 'news': 'news_cont.news_url',
                'title': news_cont.news_title}

    content = json.dumps(newsPage)
    return HttpResponse(content, content_type="application/json")


# 删除评论
@decorators.group_required('admin_1')
def delete_comm(request):
    # 检查权限
    # try:
    #     user_info = models.UserInfo.objects.get(
    #         username=request.user.username)
    #     user_group = Group.objects.get(user=user_info)
    # except models.UserInfo.DoesNotExist:
    #     return HttpResponse("请使用疫情新闻发布子系统管理员账号登录")
    # if user_group != 'admin_1':  # 等一个接口
    #     return HttpResponse("请使用疫情新闻发布子系统管理员账号登录")

    # 获取评论数据
    Cmt_info = json.loads(request.body)
    Cmt_id = Cmt_info['cmt_id']

    # 删除评论表及关系表的记录
    try:
        models.NewsComments.objects.filter(cmt_id=Cmt_id).delete()
        models.Comment.objects.filter(cmt_id=Cmt_id).delete()
        models.PublishComments.objects.filter(cmt_id=Cmt_id).delete()
    except:
        return HttpResponse("删除失败，评论不存在")

    return HttpResponse("删除评论成功")

# 举报评论


@decorators.login_required
def report(request):
    # try:
    #     user_info = models.UserInfo.objects.get(
    #         username=request.user.username)
    #     user_group = Group.objects.get(user=user_info)
    # User_id = request.session.get('_auth_user_id')
    # except models.UserInfo.DoesNotExist:
    #     return HttpResponse("请登录")  # 游客

    # 获取举报信息
    Cmt_info = json.loads(request.body)
    UserName = Cmt_info['username']
    User_id = usermodels.UserInfo.objects.get(username=UserName)
    Cmt_id = Cmt_info['cmt_id']
    report_reason = Cmt_info['reason']

    Report_time = time.strftime(
        "%Y-%m-%d %H:%M:%S", time.localtime())

    try:
        # 插入举报表
        Jug_cmt_id = models.JudgeComment.objects.aggregate(
            Max('judge_cmt_id'))['judge_cmt_id__max']+1
        report_info = models.JudgeComment.objects.create(
            judge_cmt_id=Jug_cmt_id, user_id=User_id, cmt_id=Cmt_id, report_text=report_reason, report_time=Report_time, report_type=1)
        # 修改评论状态
        update = models.Comment.objects.filter(
            cmt_id=Cmt_id).update(is_reliable=1)
    except:
        return HttpResponse("举报失败")

    return HttpResponse("举报成功，我们会尽快处理")

# 显示新闻列表


def news_list(request, ori_type):
    val = 1
    if(ori_type == 'process'):  # 后端分新闻类型返回
        val = 1
    if(ori_type == 'knowledges'):
        val = 2
    if(ori_type == 'newest'):
        val = 3
    Allnews = models.NewsColumn.objects.filter(cl_id=val)
    newsinfo_list = []

    for news in Allnews:
        news_item = {}

        news_item['num'] = news.news_id.news_id

        news_item['title'] = news.news_id.news_title
        news_item['text'] = news.news_id.news_url

        newsinfo_list.append(news_item)
    news = {'news': newsinfo_list}
    content = json.dumps(news)
    return HttpResponse(content, content_type="application/json")


# 搜索功能


def search_new_list(request):
    key = request.GET.get('key')
    Allnews = models.News.objects.all()
    newsinfo_list = []
    for news in Allnews:
        if key in news.news_title:  # 标题包含关键字则返回
            news_item = {}
            news_item['news_title'] = news.news_title
            news_item['news_url'] = news.news_url
            news_item['view_num'] = news.view_num
            news_item['news_gen_time'] = str(news.news_gen_time)
            news_item['news_id'] = news.news_id
            news_item['col_id'] = models.NewsColumn.objects.filter(
                news_id=news.news_id)
            newsinfo_list.append(news_item)

    content = json.dumps(newsinfo_list)
    return HttpResponse(content, content_type="application/json")


def likes(request):
    Cmt_id = request.GET.get('cmt_id')

    try:
        cmt_obj = models.Comment.objects.get(
            cmt_id=Cmt_id)
        cmt_obj.like_num = cmt_obj.like_num+1
        cmt_obj.save()
    except:
        return HttpResponse("点赞失败")

    Judge_cmt_id = models.JudgeComment.objects.aggregate(
        Max('judge_cmt_id'))['judge_cmt_id__max']+1
    Report_time = time.strftime(
        "%Y-%m-%d %H:%M:%S", time.localtime())

    User = json.loads(request.body)

    UserName = User['username']
    User_id = usermodels.UserInfo.objects.get(username=UserName)

    Report_info = models.JudgeComment.objects.create(
        judge_cmt_id=Judge_cmt_id, user_id=User_id, cmt_id=Cmt_id, report_time=Report_time, report_type=0)

    HttpResponse("点赞成功")


def getImg(request):
    getNewsid = request.GET.get('newsid')
    try:
        imgid_query = models.NewsImages.objects.filter(news_id=getNewsid)
        Img_id = 1
        for img in imgid_query:
            Img_id = img.img_id  # 其实只有一个元素，直接拿出来就行
        img_query = models.Images.objects.filter(img_id=Img_id)
        path = ""
        for img in img_query:  # 同样只有一个
            path = img.img_path
        return HttpResponse(path)  # 返回图片路径
    except:
        return HttpResponse("获取图片失败")


def del_news(request):
    News = json.loads(request.body)
    News_id = News['num']

    # 删除新闻评论
    items_newscomm = models.NewsComments.objects.filter(news_id=News_id)
    for item in items_newscomm:

        commID = item.cmt_id.cmt_id
        comm_obj = models.Comment.objects.get(cmt_id=commID)
        comm_obj.delete()
    # 删除新闻
    news_obj = models.News.objects.get(news_id=News_id)
    news_obj.delete()


def get_user_comm(request):
    User = json.loads(request.body)
    Username = User['username']

    Useritem = models.UserInfo.objects.get(username=Username)
    UserID = Useritem.user_id

    Comms = models.PublishComments.objects.filter(user_id=UserID)

    cmtlist = []

    for cmt in Comms:
        cmtid = cmt.cmt_id.cmt_id  # 找到评论id
        cmtinfo = models.Comment.objects.get(cmt_id=cmtid)  # 获取评论内容
        if cmtinfo.is_reliable == 3:
            cmt_item = {}
            cmt_item['cmt_gen_time'] = str(cmtinfo.cmt_gen_time)
            cmt_item['cmt_content'] = cmtinfo.cmt_content
            cmtlist.append(cmt_item)

    content = json.dumps(cmtlist)
    return HttpResponse(content, content_type="application/json")
