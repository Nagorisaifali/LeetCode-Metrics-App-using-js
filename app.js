

document.addEventListener("DOMContentLoaded" , function(){

    const searchbtn = document.getElementById("search-btn") ; 
    const usernameinput = document.getElementById("user-input") ; 
    const stateContainer = document.querySelector(".state-container") ; 
    const easyprogresscrcle = document.querySelector(".easy-progress") ; 
    const mediumprogresscrcle = document.querySelector(".medium-progress") ; 
    const hardprogresscrcle = document.querySelector(".hard-progress") ; 
    const easylabel = document.getElementById("easy-label") ;
    const mediumlabel = document.getElementById("medium-label") ;
    const hardlabel = document.getElementById("hard-label") ;
    const cardstatecontainer = document.querySelector(".state-cards") ;
    const totallabel = document.getElementById("total-label")
    
    const totalprogress = document.querySelector(".total-progress")
    


    function validatedUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty ") ; 
            return false ; 
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username) ; 
        if(!isMatching){
            alert("Invalid Username")
        }
        return isMatching ; 
    }

    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`

        try{
            searchbtn.textContent = "Searching....." ; 
            searchbtn.disabled = true ;

            const response = await fetch(url) ; 
            if(!response){
                throw new Error("Unable to fetch the user detail ") ; 
            }
            const passeddata = await response.json() ;
            console.log(passeddata) ; 

            displayuserdata(passeddata) ; 
        }
        catch(error){
            stateContainer.innerHTML = `<p>No Data Found</p>`
        }
        finally{
            searchbtn.textContent = "Searching....." ; 
            searchbtn.disabled = false ;
        }
    }

    function updateprogress(solved , total , label , circle){
        const progressDegree = (solved/total)*100 ;
        circle.style.setProperty("--progress-degree" , `${progressDegree}%`) ; 
        const num = `${solved}/${total}`
        label.textContent = num ; 
    }

    function displayuserdata(passeddata){
        const totalques = passeddata.totalQuestions ; 
        const totaleasy = passeddata.totalEasy;
        const totalmedium = passeddata.totalMedium;
        const totalhard = passeddata.totalHard; 

        const solvedtotal = passeddata.totalSolved ; 

        const easysolved = passeddata.easySolved ;
        const mediumsolved = passeddata.mediumSolved ;
        const hardsolved = passeddata.hardSolved ;

        console.log(easysolved) ; 

        updateprogress(easysolved , totaleasy ,easylabel , easyprogresscrcle) ; 
        updateprogress(mediumsolved , totalmedium ,mediumlabel , mediumprogresscrcle) ;
        updateprogress(hardsolved , totalhard ,hardlabel , hardprogresscrcle) ; 
        updateprogress(solvedtotal , totalques , totallabel , totalprogress) ; 
    }

    searchbtn.addEventListener("click" , function(){
        const username = usernameinput.value ; 
        if(validatedUsername(username)){
            fetchUserDetails(username) ; 
        }
    })

})

