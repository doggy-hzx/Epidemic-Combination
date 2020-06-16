# Epidemic-Combination
新的用于整合的repository

先每个组一个branch吧，改完传到自己branch

有几个需要注意的点，也是为了方便大家整合：

1. 五个app，一个组一个，不要动其他组的文件

2. urls.py文件只有一个，每个组的路径可以自己加在后面，不要改其他组的内容
	引用的自己模块文件夹下的文件时，比如views.py，可以用as避免重名，e.g.

```python
   from Group07 import views as g7
```

3. settings.py也只有一个，尽量不要修改

4. 可以使用各自的数据库，在settings里DATABASES里加上自己数据库的配置
	然后在dbRouter文件夹下面的db_router.py文件里的map里添上和自己app的对应关系就好了
	都有样例
	如果用的是本地的数据库，把scheme（create和insert语句）给出来，可以在我们的数据库上部署

5. 前端整合好了的话
	大家的前端文件都一样，templates里就不用动，就是前端build好的文件
	如果要改前端，拿着前端整合好build前的文件改完再build放进去

把原先的后端放进去应该还是挺快的，这也是一个让自己代码更整洁的机会，可以删掉许多没用的东西

遇到具体问题请及时反馈沟通