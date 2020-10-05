let characterTyped = 0;
let errors = 0;
let gameStart = false;
let gameState = true;
let duration = 0;
let timeLimit = 0;
let timeElapsed = 0;
let timer = null;
let minutes,seconds;

const DOMStrings = {
    timeDisplay: ".time-limit",
    wordBox: ".word-list",
    inputBox: ".text-input",
    refreshBtn: ".refresh",
    errorsNum: ".errors-num",
    wpmNum: ".wpm-num",
    accuracyNum: ".accuracy-num",
    durText: ".duration",
    durSubmit: ".submit-duration"
};

const input_box = document.querySelector(DOMStrings.inputBox);
const quote_text = document.querySelector(DOMStrings.wordBox);
const durAmount = document.querySelector(DOMStrings.durText);

const frontEndController = (function(){
    const topWords = "the of to and a in is it you that he was for on are with as I his they be at one have this from or had by not word but what some we can out other were all there when up use your how said an each she which do their time if will way about many then them write would like so these her long make thing see him two has look more day could go come did number sound no most people my over know water than call first who may down side been now find any new work part take get place made live where after back little only round man year came show every good me give our under name very through just form sentence great think say help low line differ turn cause much mean before move right boy old too same tell does set three want air well also play small end put home read hand port large spell add even land here must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four between state keep eye never last let thought city tree cross farm hard start might story saw far sea draw left late run don't while press close night real life few north open seem together next white children begin got walk example ease paper group always music those both mark often letter until mile river car feet care second book carry took science eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main enough plain girl usual young ready above ever red list though feel talk bird soon body dog family direct pose leave song measure door product black short numeral class wind question happen complete ship area half rock order fire south problem piece told knew pass since top whole king space heard best hour better true during hundred five remember step early hold west ground interest reach fast verb sing listen six table travel less morning ten simple several vowel toward war lay against pattern slow center love person money serve appear road map rain rule govern pull cold notice voice unit power town fine certain fly fall lead cry dark machine note wait plan figure star box noun field rest correct able pound done beauty drive stood contain front teach week final gave green oh quick develop ocean warm free minute strong special mind behind clear tail produce fact street inch multiply nothing course stay wheel full force blue object decide surface deep moon island foot system busy test record boat common gold possible plane stead dry wonder laugh thousand ago ran check game shape equate hot miss brought heat snow tire bring yes distant fill east paint language among grand ball yet wave drop heart am present heavy dance engine position arm wide sail material size vary settle speak weight general ice matter circle pair include divide syllable felt perhaps pick sudden count square reason length represent art subject region energy hunt probable bed brother egg ride cell believe fraction forest sit race window store summer train sleep prove lone leg exercise wall catch mount wish sky board joy winter sat written wild instrument kept glass grass cow job edge sign visit past soft fun bright gas weather month million bear finish happy hope flower clothe strange gone jump baby eight village meet root buy raise solve metal whether push seven paragraph third shall held hair describe cook floor either result burn hill safe cat century consider type law bit coast copy phrase silent tall sand soil roll temperature finger industry value fight lie beat excite natural view sense ear else quite broke case middle kill son lake moment scale loud spring observe child straight consonant nation dictionary milk speed method organ pay age section dress cloud surprise quiet stone tiny climb cool design poor lot experiment bottom key iron single stick flat twenty skin smile crease hole trade melody trip office receive row mouth exact symbol die least trouble shout except wrote seed tone join suggest clean break lady yard rise bad blow oil blood touch grew cent mix team wire cost lost brown wear garden equal sent choose fell fit flow fair bank collect save control decimal gentle woman captain practice separate difficult doctor please protect noon whose locate ring character insect caught period indicate radio spoke atom human history effect electric expect crop modern element hit student corner party supply bone rail imagine provide agree thus capital won't chair danger fruit rich thick soldier process operate guess necessary sharp wing create neighbor wash bat rather crowd corn compare poem string bell depend meat rub tube famous dollar stream fear sight thin triangle planet hurry chief colony clock mine tie enter major fresh search send yellow gun allow print dead spot desert suit current lift rose continue block chart hat sell success company subtract event particular deal swim term opposite wife shoe shoulder spread arrange camp invent cotton born determine quart nine truck noise level chance gather shop stretch throw shine property column molecule select wrong gray repeat require broad prepare salt nose plural anger claim continent oxygen sugar death pretty skill women season solution magnet silver thank branch match suffix especially fig afraid huge sister steel discuss forward similar guide experience score apple bought led pitch coat mass card band rope slip win dream evening condition feed tool total basic smell valley nor double seat arrive master track parent shore division sheet substance favor connect post spend chord fat glad original share station dad bread charge proper bar offer segment slave duck instant market degree populate chick dear enemy reply drink occur support speech nature range steam motion path liquid log meant quotient teeth shell neck";

    const error_text = document.querySelector(DOMStrings.errorsNum);
    const wpm_text = document.querySelector(DOMStrings.wpmNum);
    const accuracy_text = document.querySelector(DOMStrings.accuracyNum);

    const finishGame = function(){
        gameState = false;
        clearInterval(timer);
        quote_text.classList.add('disabled');
    };

    return {
        updateTimer: function(){
            const timeDisplay = document.querySelector(DOMStrings.timeDisplay);

            if(timeLimit === 0) {
                finishGame();
            }else{
                timeLimit--;
                timeElapsed++;
                minutes = parseInt(timeLimit/60,10);
                seconds = parseInt(timeLimit%60,10);
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                timeDisplay.textContent = minutes + ":" + seconds;
            }
        },

        createTextBox: function() {
            const wordList = topWords.split(" ");
            let randomWords = [];

            quote_text.innerHTML="";

            wordList.forEach(function(){
                const randomNum = Math.floor(Math.random() * 1000);
                randomWords.push(wordList[randomNum]);
            })

            randomWords.forEach(word => {
                const charSpan = document.createElement('span');
                const spaceSpan = document.createElement('span');
                charSpan.innerText = word;
                spaceSpan.innerText = " ";
                quote_text.appendChild(charSpan);
                quote_text.appendChild(spaceSpan);
            });
            quote_text.querySelector('span:first-child').classList.add('highlight');
        },

        processCurrentText: function() {
            let curr_input = input_box.value.trim();
            let charInput = curr_input.split('');
            let toCheck = charInput;

            characterTyped+=charInput.length+1;

            const checkSpan = quote_text.querySelector('.highlight');
            const nextWord = checkSpan.nextSibling.nextSibling;

            if(checkSpan.innerHTML===curr_input){
                checkSpan.classList.add('correct_char');
                checkSpan.classList.remove('highlight');
            }else{
                wordChar = checkSpan.innerHTML.split('');
                let toCheck2 = wordChar;
                checkSpan.innerHTML="";
                if(wordChar.length > charInput.length){
                    toCheck=wordChar;
                    toCheck2=charInput;
                }
                toCheck.forEach((char,index) => {
                    const newSpan = document.createElement('span');
                    if(char !== toCheck2[index]){
                        newSpan.classList.add('incorrect_char');
                        errors++;
                    }else{
                        newSpan.classList.add('correct_char');
                    }
                    newSpan.innerText=char;
                    checkSpan.appendChild(newSpan);
                });
                checkSpan.classList.remove('highlight');
            }
            nextWord.classList.add('highlight');

            wpm = Math.round(((characterTyped/5)/timeElapsed)*60);
            accuracy = ((characterTyped - errors)/characterTyped)*100;

            wpm_text.textContent = wpm+" WPM";
            accuracy_text.textContent = accuracy.toFixed(2)+"%";
            error_text.textContent = errors;
        },

        checkToDelete: function(q) {
            let quote_text = q;

            if(quote_text.previousSibling){
                if(quote_text.previousSibling.offsetTop>225){
                    quote_text = q.previousSibling.previousSibling;
                    this.checkToDelete(quote_text);
                }else{
                    q.previousSibling.remove();
                    q.previousSibling.remove();
                    this.checkToDelete(q);
                }
            }
        },

        setDuration: function(durAmount) {
            duration = parseInt(durAmount);
            timeLimit = duration+1;
            frontEndController.updateTimer();
        },

        clearField: function() {
            input_box.value = "";
            durAmount.value = "";
        }
    }
})();


const controller = (function(frontEndController){
    const setUpEventListeners = function() {
        const input_box = document.querySelector(DOMStrings.inputBox);
        const reset_btn = document.querySelector(DOMStrings.refreshBtn);
        const duration_btn = document.querySelector(DOMStrings.durSubmit);
        
        input_box.addEventListener('input',startGame);
        input_box.addEventListener('keydown',processText);

        reset_btn.addEventListener('click',restartGame);

        duration_btn.addEventListener('click',setDuration);
        durAmount.addEventListener('keydown', key => {
            if (key.keyCode === 13) {
                setDuration();
            }
        });
    }
    
    const startGame = function() {
        if(!gameStart){
            timer = setInterval(frontEndController.updateTimer,1000);
            gameStart = true;
        }
    }

    const processText = function(event){
        if(event.code === "Space"){
            if(gameState){
                frontEndController.processCurrentText();
                const quote_text = document.querySelector('.highlight');
                if(quote_text.offsetTop>300){
                    frontEndController.checkToDelete(quote_text);
                }
            }
            frontEndController.clearField();
        }
    }

    const restartGame = function(){
        gameStart=false;
        gameState=true;
        document.querySelector('.highlight').classList.remove('highlight');
        document.querySelectorAll('.correct_char').forEach(curr => {
            curr.classList.remove('correct_char');
        })
        document.querySelectorAll('.incorrect_char').forEach(curr => {
            curr.classList.remove('incorrect_char');
        });
        errors=0;
        characterTyped=0;
        timeElapsed=0;
        timeLimit=duration+1;
        clearInterval(timer);
        input_box.value="";
        input_box.focus();
        quote_text.classList.remove('disabled');
        frontEndController.updateTimer();
        frontEndController.createTextBox();
        frontEndController.clearField();
    }

    const setDuration = function(){
        const durValue = durAmount.value;
        if(durValue){
            frontEndController.setDuration(durValue);
            restartGame();
        }
    }

    return {
        init : function() {
            frontEndController.createTextBox();
            frontEndController.setDuration(60);
            setUpEventListeners();
            gameState = true;
            input_box.focus();
        }
    }
})(frontEndController);

controller.init();