<tpl id="step1">
	<div class="wrapper step-one ">
	    <div class="header">
	        <div class="logo"></div>
	    </div>
	    <div class="formbox">
	        <form>
	            <select id="mark" class="textfield" require>
	                <option value="false">Выберите марку</option>
	            </select>
	            <select class="textfield js-pick-model" require>
	                <option value="false">Выберите модель</option>
	            </select>
	            <input id="js-next-step" type="submit" value="ГОЛОСОВАТЬ" class="submit">
	        </form>
	    </div>
	</div>
</tpl>
<tpl id="step2">
    <div class="wrapper step-two">
        <div class="header">
            <div class="logo"></div>
        </div>
        <div class="formbox">
            <h1>Ваш выбор</h1>
            <p class="choosen-tm"><span class="js-choosen-mark">ASTON MARTIN</span><br>
                <span class="js-choosen-model">V8 VANTAGE ROADSTER/S</span></p>
            <form>
                <select class="textfield js-auth" require>
                    <option value="false">Способ регистрации</option>
                    <option value="email">E-mail</option>
                    <option value="vk">VKontakte</option>
                    <option value="fb">Facebook</option>
                </select>
                <input id="js-next-step" type="submit" value="Подтвердить голос" class="submit">
            </form>
        </div>
        <div class="trophy">
            <div class="link"><a href="autogoda.ru">Оферта на autogoda.ru</a></div>
        </div>
    </div>
</tpl>
<tpl id="step3">
    <div class="wrapper step-three">
        <div class="header">
            <div class="logo"></div>
        </div>
        <div class="formbox">
            <h1>спасибо</h1>
            <p class="choosen-tm">На ваш e-mail отправлено письмо. Активируйте свой голос и узнайте, как выиграть <a href="#">Главный приз</a></p>
        </div>
        <div class="trophy">
            <div class="link"><a href="autogoda.ru">Оферта на autogoda.ru</a></div>
        </div>
    </div>
</tpl>

<css>
	<!-- inject:cssFile -->
	<!-- endinject -->
</css>