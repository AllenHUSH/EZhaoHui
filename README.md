# Url对象及其属性（数据库中）
|字段名字|name|描述|
|--|--|--|
|城市|city||
|企业|company||
|开始时间|creat_time||
|结束时间|end_time||
|备注|info||
|图片地址|picture||
|省区|province||
|状态|state||
|标题（职位名称）|title||
|招聘连接|url||
|创建用户|username||

# insertUrl接口文档

author: tangwj 

#### 接口名:insertUrl    
######集合名（set）t_url
字段 |字段类型  | 字段说明  |是否能为空|
-|-|-|-
province|String|招聘公司省市|否
 city|String|招聘公司城市|否
 company|String|公司名称|否
create_time|date|招聘开始时间|否
 end_time|date|招聘结束时间|否
 salary|number|薪资|是
 menbers|number|招募成员人数|否
 edu_back|string|受教育背景|是
 info|string|简要说明|是
 picture|string|公司图片|是
 state|number|招募信息审核状态 0未审核/1审核通过|空（自动设置 0）
 title|string|招募标题|否
 url|string|招聘url|否
 username|string|发布招聘的用户名|否
使用范例
```
 wx.cloud.callFunction({
 name: 'insertUrl',
 data: {
    province:"吉林",
    city:  "长春市",
    company: "笑果文化有限公司",
    create_time:"发布时间",
    salary:6000,
    menbers:5,
    edu_back:"小学文化",
    end_time:"截止时间",
    info:"简简单单的说明",
    picture:"图片地址",
    title:"招募逗乐人士",
    url: "www.baidu.com",
    username: "李诞", 
 }
 }).then(res => {
 this.setData({
  。。。。。。。i
 })
 })

```
返回结果
```
  {
      data:{
          /0 失败/ 1 成功
          info:[int],  
          
          /成功 insert_success
          /失败 insert_fail
          /失败具体原因
          /userName_empty
          /url_empty
          /city_empty
          /menbers_empty
          /salary_empty
          /edu_back_empty
          /province_empty
          /create_end_time_empty
          msg:[String]  
      }
  }
```


# queryUrl接口

|type|需要参数|说明|
|--|--|--|
|one|city，company，edu_back，info,province，state|city，state为不可缺数据|
|two|state|按照state的值查询|
|all|-|后台全部数据|
|city|city|按照city查询|
||||
*info 说明格式是（薪资 岗位信息）*
