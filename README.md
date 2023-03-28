# Software Studio 2020 Spring Midterm Project
學號:106030019 姓名:吳岱容

## Topic
* Project Name : NyanChat  
* Key functions (add/delete)  
    1. 大廳聊天室 （所有人都看得到可以發言的聊天室）  
    2. Room List （可以看到自己加入的所有房間,從此進入一對一私人聊天室,也可在此新增房間,需要輸入對方註冊信箱及房間名稱）  
    3. 一對一私人聊天室 （只有限定成員才可進入可以發言的聊天室）  
    4. 提供第三方(google)及電子郵件註冊  
    5. notification （在訂閱成功及未修改使用者名稱時會顯示）
* Other functions (add/delete)  
    1. 可以更改使用者名稱  
![](https://i.imgur.com/PyW2Haj.png)  

## Basic Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Membership Mechanism|15%|Y|
|Firebase Page|5%|Y|
|Database|15%|Y|
|RWD|15%|Y|
|Topic Key Function|20%|Y|

## Advanced Components
|Component|Score|Y/N|
|:-:|:-:|:-:|
|Third-Party Sign In|2.5%|Y|
|Chrome Notification|5%|Y|
|Use CSS Animation|2.5%|Y|
|Security Report|5%|Y|

## Website Detail Description

# 作品網址：https://midterm-c6900.web.app

# Components Description : 
1. Membership Mechanism :   
    註冊使用電子郵件註冊  
    ![](https://i.imgur.com/Ufwz1bk.png)  
    按下sign up後會跳出alert顯示是否成功註冊  
    成功會轉回首頁  
    ![](https://i.imgur.com/EalOnZb.png)  
    可以再按下sign in鈕登入  
    ![](https://i.imgur.com/76BS6ow.png)  
    若有錯誤一樣會跳出alert  
    要登出的話,按下navbar上的登出鈕即可登出  
    ![](https://i.imgur.com/NxlAA50.png)  

2. Firebase Page : 已Deploy  
3. Database :   
    ![](https://i.imgur.com/og2cpF4.png)  
    Database Rules(只有登入者才可以Read/Write)  
    Read Write的使用在聊天室還有新增private room的地方  
    輸入對話或要新增的房間後,網頁會即時更新  
    ![](https://i.imgur.com/2IKdXpN.png)  
    ![](https://i.imgur.com/occ0oSZ.png)  
4. RWD :  
    利用vw或@media來實作  
5. Topic Key Function :  
    一對一的Private room  
    ![](https://i.imgur.com/occ0oSZ.png)  
    必須先在RoomList的頁面創建房間  
    需輸入房名以及加入成員的註冊信箱  
    按下Submit後下方會更新房間列表(必須要是該房間的成員才看得見)  
    之後輸入房名按下Enter後就可以進入到該房間進行私人對話  
    若非該房成員,沒辦法進到房裡也不能讀取該房聊天內容  
6. Third-Party Sign In :  
    使用google做第三方登入  
7. Chrome Notification :  
    第一次進入到大廳會詢問是否開啟通知  
    ![](https://i.imgur.com/P7fvHNq.png)  
    若按下允許會出現訂閱成功的訊息  
    ![](https://i.imgur.com/3ZiZ9xg.png)  
    如果尚未設定使用者名稱,會跳出通知建議設定  
    ![](https://i.imgur.com/UKXm3a6.png)  
8. Use CSS Animation :  
    首頁的飄雪是動畫  


# Other Functions Description : 
1. Change User's Name :  
    進入到UserInfo的介面  
    可以更改使用者名稱也可以看到現在的名稱  
    所有功能若沒有預設名稱非google帳號顯示的皆為註冊信箱  
    ![](https://i.imgur.com/mAwQ4oK.png)  


## Security Report (Optional)
1.防止使用者使用html破壞頁面   
![](https://i.imgur.com/5JlwtB2.png)  
設計方法是將或取得資料檢查是否有<>  
若有則替換掉  
2. room的名稱是藉由database傳值  
為防止讀到錯誤的房名或獲取不到  
每次讀取完都會再清空 
若抓不到資料會顯示alert將使用者引導回room list介面