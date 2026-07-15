// ===============================
// ELEMENTS
// ===============================



const briefing = document.getElementById("briefingScreen");
const missionControl = document.getElementById("missionControl");

const beginBtn = document.getElementById("beginMission");

const countdown = document.getElementById("countdown");
const successScreen =
document.getElementById("successScreen");
const status = document.getElementById("missionStatus");

const log = document.getElementById("missionLog");

const altitude = document.getElementById("altitude");

const velocity = document.getElementById("velocity");
const vikram =
document.getElementById("vikram");
const flame = document.getElementById("flame");

const smoke = document.getElementById("smoke");

const rocket = document.getElementById("rocket");
const landingScene =
document.getElementById("landingScene");

const landingVikram =
document.getElementById("landingVikram");

const landingFlame =
document.getElementById("landingFlame");
const camera = document.getElementById("camera");

const checks = document.querySelectorAll("#systemChecks li");

const nextCommand = document.getElementById("nextCommand");

const boosterLeft =
document.getElementById("boosterLeft");

const boosterRight =
document.getElementById("boosterRight");

const flash =
document.getElementById("flash");

const earth =
document.getElementById("earth");

const moon =
document.getElementById("moon");

const transitionScreen =
document.getElementById("transitionScreen");

const loadingFill =
document.getElementById("loadingFill");

const loadingText =
document.getElementById("loadingText");

const transitionTitle =
document.getElementById("transitionTitle");

const launchpad =
document.getElementById("launchpad");

const orbitScene =
document.getElementById("orbitScene");

const spacecraft =
document.getElementById("spacecraft");

const orbitButton =
document.getElementById("orbitButton");

const orbitStatus =
document.getElementById("orbitStatus");

const orbitLog =
document.getElementById("orbitLog");

const deepSpaceGlow =
document.getElementById("deepSpaceGlow");

const cruiseMoon =
document.getElementById("cruiseMoon");

const orbitRing =
document.getElementById("orbitRing");


// ===============================
// BEGIN MISSION
// ===============================

beginBtn.addEventListener("click", () => {

    briefing.style.display = "none";

    missionControl.classList.remove("hidden");

    runSystemChecks();

});

// ===============================
// SYSTEM CHECKS
// ===============================

function runSystemChecks() {

    const systems = [

        "Navigation",

        "Telemetry",

        "Propulsion",

        "Communications",

        "Ground Systems"

    ];

    let i = 0;

    const interval = setInterval(() => {

        checks[i].innerHTML = systems[i] + " ✅";

        checks[i].style.color = "#00ff88";

        i++;

        if (i === systems.length) {

            clearInterval(interval);

            status.innerHTML = "All Systems GO";

            log.innerHTML = "Launch authorization granted.";

          
           setTimeout(startCountdown, 1200);

        }

    }, 700);

}

// ===============================
// COUNTDOWN
// ===============================

function startCountdown() {

     alert("Countdown Started");

    let t = 10;

    countdown.innerHTML = "T - " + t;

    log.innerHTML = "Countdown initiated.";

    const timer = setInterval(() => {

        t--;

        countdown.innerHTML = "T - " + t;

        if (t === 6)
            log.innerHTML = "Final guidance alignment.";

        if (t === 4)
            log.innerHTML = "Engine chill sequence.";

        if (t === 2)
            log.innerHTML = "Ignition sequence start.";

        if (t <= 0) {

            clearInterval(timer);

            ignition();

        }

    }, 1000);

}

// ===============================
// IGNITION
// ===============================

function ignition() {

   

    

    countdown.innerHTML = "LIFT OFF";

    status.innerHTML = "Vehicle Ascending";

    log.innerHTML = "PSLV engines at full thrust.";

    flame.style.opacity = 1;

    smoke.style.opacity = 1;

    flame.style.animation = "flame .15s infinite";

    document.body.style.animation = "shake .15s infinite";

    launch();

}

// ===============================
// LAUNCH
// ===============================

function launch() {

    let alt = 0;

    let vel = 0;

    let scroll = 0;

    const fly = setInterval(() => {

        alt += 4;

        vel += 0.08;

        scroll += 3;

        altitude.innerHTML = alt + " km";

        velocity.innerHTML = vel.toFixed(2) + " km/s";

        rocket.style.bottom = (140 + scroll) + "px";

        flame.style.bottom = (92 + scroll) + "px";

        smoke.style.transform = `translateX(-50%) scale(${1 + scroll/200})`;

        smoke.style.opacity = Math.max(0.8 - scroll/500, 0);

        document.getElementById("launchpad").style.bottom = (-scroll * 0.4) + "px";

        if (alt < 50) {

            log.innerHTML = "Clearing launch tower...";

        }

        else if (alt < 120) {

            log.innerHTML = "Ascending through atmosphere...";

        }

        else if (alt < 220) {

            log.innerHTML = "Passing Max-Q...";

        }

        else {

            log.innerHTML = "Approaching Stage Separation...";

        }

        if (alt >= 350) {

            clearInterval(fly);

            stagePause();

        }

    }, 40);

}

// ===============================
// STAGE PAUSE
// ===============================

function stagePause(){

    document.body.style.animation = "none";

    flame.style.opacity = 0;

    smoke.style.opacity = 0;

    status.innerHTML = "Stage 1 Burnout";

    countdown.innerHTML = "MISSION PAUSED";

    log.innerHTML =
    "Awaiting Stage Separation Command...";

    nextCommand.innerHTML = "SEPARATE STAGE";

   nextCommand.classList.remove("hiddenButton");

}

nextCommand.addEventListener("click", stageSeparation);

function stageSeparation(){

    nextCommand.classList.add("hiddenButton");

    status.innerHTML =
    "Booster Separation";

    countdown.innerHTML =
    "SEPARATING";

    log.innerHTML =
    "Initiating Booster Separation...";

    // Flash

    flash.style.opacity = 0.9;

    setTimeout(()=>{

        flash.style.opacity = 0;

    },180);

    // Show boosters

    boosterLeft.style.opacity = 1;

    boosterRight.style.opacity = 1;

    // Place them beside rocket

    boosterLeft.style.bottom =
    rocket.style.bottom;

    boosterRight.style.bottom =
    rocket.style.bottom;

    // Small camera shake

    document.body.style.animation =
    "shake .12s";

    setTimeout(()=>{

        document.body.style.animation =
        "";

    },250);

    // Separate boosters

    setTimeout(()=>{

        boosterLeft.style.left =
        "36%";

        boosterRight.style.left =
        "64%";

        boosterLeft.style.bottom =
        "80px";

        boosterRight.style.bottom =
        "80px";

        boosterLeft.style.transform =
        "rotate(-35deg)";

        boosterRight.style.transform =
        "scaleX(-1) rotate(35deg)";

        flame.style.opacity = 1;

        flame.style.width = "40px";

        flame.style.animation =
        "flame .12s infinite";

        log.innerHTML =
        "Boosters successfully separated.";

        status.innerHTML =
        "Second Stage Ignition";

    },300);

    // Continue mission

    setTimeout(()=>{

        log.innerHTML =
        "Vehicle accelerating toward orbit.";

        countdown.innerHTML =
        "MISSION CONTINUES";

        continueAscent();

    },2200);

}

function continueAscent(){

    let h = 350;

    let v = 7.8;

    let scroll = parseInt(rocket.style.bottom) || 350;

    const fly = setInterval(()=>{

        h += 3;

        v += 0.03;

        scroll += 2;

        altitude.innerHTML =
        h + " km";

        velocity.innerHTML =
        v.toFixed(2) + " km/s";

        rocket.style.bottom =
        scroll + "px";

        // Gradually shrink rocket
        let scale = Math.max(0.45, 1 - (h - 350) / 500);

        rocket.style.transform =
        `translateX(-50%) scale(${scale})`;

        flame.style.transform =
        `translateX(-50%) scale(${scale})`;

        flame.style.bottom =
        (scroll-48) + "px";

       if(h>500){

    clearInterval(fly);

    countdown.innerHTML =
    "EARTH ORBIT";

    status.innerHTML =
    "Parking Orbit Achieved";

    log.innerHTML =
    "Awaiting Trans-Lunar Injection.";

    flame.style.opacity = 0;

    setTimeout(startTransition,1500);

    }

    },40);

}

function startTransition(){

    missionControl.classList.add("hidden");

    transitionScreen.style.display = "flex";

    let p = 0;

    const load = setInterval(()=>{

        p++;

        loadingFill.style.width = p + "%";

        if(p==30)
            loadingText.innerHTML =
            "Connecting to ISRO Deep Space Network...";

        if(p==60)
            loadingText.innerHTML =
            "Switching to Orbital Tracking Camera...";

        if(p==85)
            loadingText.innerHTML =
            "Signal Acquired...";

        if(p>=100){

            clearInterval(load);

            transitionTitle.innerHTML =
            "ORBITAL VIEW READY";

            setTimeout(showOrbitScene,800);

        }

    },20);

}

function showOrbitScene(){

    transitionScreen.style.display="none";

    orbitScene.classList.remove("hidden");

    startOrbitAnimation();

}

orbitButton.addEventListener("click", orbitRaise);

// ===============================
// ORBIT ANIMATION
// ===============================

let orbitAngle = -90;
let orbitRadius = 210;
let orbitAnimation;

function startOrbitAnimation(){

    orbitAnimation = setInterval(()=>{

        orbitAngle += 0.6;

        const rad = orbitAngle * Math.PI / 180;

        const x = Math.cos(rad) * orbitRadius;

        const y = Math.sin(rad) * orbitRadius;

        spacecraft.style.left =
        `calc(50% + ${x}px)`;

        spacecraft.style.top =
        `calc(50% + ${y}px)`;

        // Rotate spacecraft so it points
        // along the direction of travel

        spacecraft.style.transform =
        `translate(-50%,-50%) rotate(${orbitAngle+180}deg)`;

    },20);

}

function orbitRaise(){

    orbitButton.disabled = true;

    orbitStatus.innerHTML =
    "Orbit Raising Burn";

    orbitLog.innerHTML =
    "Main engine ignition...";

    flame.style.opacity = 1;

    flame.style.width = "18px";

    flame.style.animation =
    "flame .1s infinite";

    let targetRadius = 320;

    const raise = setInterval(()=>{

        // Increase orbit radius
        orbitRadius += 0.9;

        // Zoom camera slightly
        const scale =
        1-(orbitRadius-210)/850;

        earth.style.transform =
        `translate(-50%,-50%) scale(${scale})`;

        document.getElementById("orbitRing").style.width =
        orbitRadius*2 + "px";

        document.getElementById("orbitRing").style.height =
        orbitRadius*2 + "px";

        if(orbitRadius>235){

            orbitLog.innerHTML =
            "Perigee successfully raised.";

        }

        if(orbitRadius>270){

            orbitLog.innerHTML =
            "Apogee increasing...";

        }

        if(orbitRadius>305){

            orbitLog.innerHTML =
            "Transfer orbit almost achieved...";

        }

        if(orbitRadius>=targetRadius){

            clearInterval(raise);

            flame.style.opacity = 0;

            spacecraft.style.transition=".4s";

            orbitStatus.innerHTML =
            "Transfer Orbit Achieved";

            orbitLog.innerHTML =
            "Awaiting Trans-Lunar Injection.";

            orbitButton.disabled = false;

            orbitButton.innerHTML =
            "INITIATE TRANS-LUNAR INJECTION";

            orbitButton.onclick =
            transLunarInjectionOrbit;

        }

    },20);

}

function transLunarInjectionOrbit(){

    orbitButton.disabled = true;

    orbitStatus.innerHTML =
    "Trans-Lunar Injection";

    orbitLog.innerHTML =
    "Main engine ignition...";

    let progress = 0;

    flame.style.opacity = 1;

    flame.style.width = "18px";

    flame.style.animation =
    "flame .08s infinite";

    const burn = setInterval(()=>{

        progress++;

        orbitRadius += 0.45;

        orbitAngle += 0.25;

        document.getElementById("orbitRing").style.opacity =
        Math.max(1-progress/140,0);

        earth.style.transform =
        `translate(-50%,-50%) scale(${1-progress/220})`;

        deepSpaceGlow.style.opacity =
        progress/150;

        if(progress==40){

            orbitLog.innerHTML =
            "Escaping Earth's gravity...";

        }

        if(progress==90){

            orbitLog.innerHTML =
            "Trajectory nominal...";

        }

        if(progress>150){

            clearInterval(burn);

            flame.style.opacity=0;

            orbitStatus.innerHTML =
            "Deep Space Cruise";

            orbitLog.innerHTML =
            "Spacecraft is travelling toward the Moon.";

            beginMoonCruise();

        }

    },40);

}
function beginMoonCruise(){

    clearInterval(orbitAnimation);

    // Freeze spacecraft at screen center
      spacecraft.style.transition = "none";
      spacecraft.style.left = "50%";
      spacecraft.style.top = "35%";
      spacecraft.style.transform = "translate(-50%, -50%) rotate(0deg)";

     // Reset Earth
      
      earth.style.top = "50%";
      
      earth.style.transform = "translate(-50%, -50%)";

     // Reset Moon
      cruiseMoon.style.right = "-180px";
      cruiseMoon.style.width = "70px";

    let progress = 0;

    orbitButton.style.display="none";

    const cruise = setInterval(()=>{

        progress++;

        // Earth becomes smaller
        let earthSize =
        Math.max(35,220-progress);

        earth.style.width =
        Math.max(40, 220 - progress) + "px";

        earth.style.left =
       (50 - progress * 0.08) + "%";

        // Spacecraft moves to the right
       // Curved trajectory

       let shipX = progress * 0.25;
       let shipY = Math.sin(progress / 35) * -12;

       spacecraft.style.left =
       (50 + shipX) + "%";

       spacecraft.style.top =
       (35 + shipY) + "%";

       let angle =
       -18 + Math.cos(progress/35)*22;

       spacecraft.style.transform =
       `translate(-50%,-50%) rotate(${angle}deg)`;

        // Moon comes closer
        // Moon moves toward centre
        let moonRight =
        Math.max(80,-180 + progress*2);

        cruiseMoon.style.right =
        moonRight + "px";

        // Moon grows
        let moonSize =
        Math.min(240,70 + progress);

        cruiseMoon.style.width =
        moonSize + "px";

        deepSpaceGlow.style.opacity =
        Math.min(1,progress/120);

        // Logs

        if(progress==30){

            orbitLog.innerHTML=
            "Leaving Earth's sphere of influence.";

        }

        if(progress==70){

            orbitLog.innerHTML=
            "Cruising through deep space.";

        }

        if(progress==120){

            orbitLog.innerHTML=
            "Lunar gravity detected.";

        }

        

            if(progress>=170){

             clearInterval(cruise);

             spacecraft.style.left = "84%";
             spacecraft.style.top = "24%";
             spacecraft.style.transform =
             "translate(-50%,-50%) rotate(-35deg)";

              orbitStatus.innerHTML =
             "Moon Encounter";

             orbitLog.innerHTML =
             "Preparing for Lunar Orbit Insertion.";

             orbitButton.style.display = "none";

             setTimeout(startMoonTransition,2500);

            }
       

    },35);

}

function startMoonTransition(){

   

    orbitScene.classList.add("hidden");

    transitionScreen.classList.remove("hidden");
    transitionScreen.style.display = "flex";

    transitionTitle.innerHTML =
    "LUNAR ORBIT CAMERA";

    loadingFill.style.width = "0%";

    loadingText.innerHTML =
    "Receiving Deep Space Telemetry...";

    let p = 0;

    const load = setInterval(()=>{

        p++;

        loadingFill.style.width = p + "%";

        if(p==30)
            loadingText.innerHTML =
            "Receiving Lunar Telemetry...";

        if(p==60)
            loadingText.innerHTML =
            "Acquiring Orbital Camera...";

        if(p==90)
            loadingText.innerHTML =
            "Moon Successfully Acquired...";

        if(p>=100){

            clearInterval(load);

            setTimeout(showMoonOrbit,700);

        }

    },25);

}

function showMoonOrbit(){

    

    transitionScreen.classList.add("hidden");

    transitionScreen.style.display = "none";
    
    orbitScene.classList.remove("hidden");
     
    // Earth disappears
    earth.style.opacity = "0";
   
    orbitRing.style.opacity = "0";
    

    // Moon appears
    cruiseMoon.style.opacity = "1";
    cruiseMoon.style.width = "180px";
    cruiseMoon.style.right = "calc(50% - 90px)";
    cruiseMoon.style.top = "50%";
    cruiseMoon.style.transform =
    "translateY(-50%)";
    
    orbitStatus.innerHTML =
    "Lunar Orbit Achieved";

    orbitLog.innerHTML =
    "Chandrayaan-3 is orbiting the Moon.";
     
    orbitButton.style.display = "block";

  // orbitButton.innerHTML =
   // "SEPARATE VIKRAM LANDER";
   

    // orbitButton.onclick = separateLander;

    orbitButton.innerHTML =
    "SEPARATE VIKRAM LANDER";

    orbitButton.onclick =
    separateLander;
    
    startMoonOrbitAnimation();
    
}

let moonOrbitAnimation;
let moonAngle = -90;

function startMoonOrbitAnimation(){

    

    clearInterval(moonOrbitAnimation);

    const radius = 140;

    moonOrbitAnimation = setInterval(()=>{

        moonAngle += 1.5;

        const rad = moonAngle * Math.PI / 180;

        // Moon centre
        const moonRect = cruiseMoon.getBoundingClientRect();
        const parentRect = cruiseMoon.parentElement.getBoundingClientRect();

        const centerX =
        moonRect.left - parentRect.left + moonRect.width/2;

        const centerY =
        moonRect.top - parentRect.top + moonRect.height/2;

        spacecraft.style.width = "28px";

        spacecraft.style.left =
        (centerX + Math.cos(rad)*radius) + "px";

        spacecraft.style.top =
        (centerY + Math.sin(rad)*radius) + "px";

        spacecraft.style.transform =
        `translate(-50%,-50%) rotate(${moonAngle+90}deg)`;

    },25);

}

function separateLander(){

    orbitButton.disabled = true;

    orbitStatus.innerHTML =
    "Lander Separation";

    orbitLog.innerHTML =
    "Separating Vikram Lander...";

    vikram.style.opacity = 1;

    vikram.style.left = spacecraft.style.left;

    vikram.style.top = spacecraft.style.top;

    let separation = 0;

    const sep = setInterval(()=>{

    separation++;

    vikram.style.left =
    `calc(${spacecraft.style.left} - ${separation}px)`;

    vikram.style.top =
    `calc(${spacecraft.style.top} + ${separation*0.7}px)`;

    if(separation>40){

        clearInterval(sep);

    }

    },20);

    setTimeout(()=>{

        orbitStatus.innerHTML =
        "Vikram Free Flight";

        orbitLog.innerHTML =
        "Vikram has separated successfully.";

        orbitButton.disabled = false;

        orbitButton.innerHTML =
        "BEGIN POWERED DESCENT";

        orbitButton.onclick =
        startLandingTransition;
    },2200);

}

function poweredDescent(){

    orbitButton.disabled = true;

    orbitStatus.innerHTML =
    "Powered Descent";

    orbitLog.innerHTML =
    "Reducing altitude...";

    let h = 100;

    const descend = setInterval(()=>{

        h--;

        orbitLog.innerHTML =
        "Altitude : " + h + " km";

         vikram.style.top =
        (parseFloat(spacecraft.style.top)-0.18) + "px";

        if(h==30){

            orbitLog.innerHTML =
            "Hazard Detection Enabled";

        }

        if(h==10){

            orbitLog.innerHTML =
            "Searching Safe Landing Site";

        }

        if(h<=0){

            clearInterval(descend);

            missionSuccess();

        }

    },80);

}

function startLandingTransition(){

    orbitScene.classList.add("hidden");

    transitionScreen.classList.remove("hidden");

    transitionScreen.style.display = "flex";

    transitionTitle.innerHTML =
    "LANDING CAMERA";

    loadingFill.style.width = "0%";

    loadingText.innerHTML =
    "Separating Vikram Lander...";

    let p = 0;

    const load = setInterval(()=>{

        p++;

        loadingFill.style.width = p + "%";

        if(p==30)
            loadingText.innerHTML =
            "Receiving Vikram Telemetry...";

        if(p==60)
            loadingText.innerHTML =
            "Switching Surface Camera...";

        if(p==90)
            loadingText.innerHTML =
            "Preparing Powered Descent...";

        if(p>=100){

            clearInterval(load);

            setTimeout(showLandingScene,700);

        }

    },25);

}

function showLandingScene(){

    transitionScreen.classList.add("hidden");

    transitionScreen.style.display="none";

    landingScene.classList.remove("hidden");

    startLanding();

}

function startLanding(){

    let altitude = 30;

    let y = 12;

    const descend = setInterval(()=>{

        altitude -= 0.15;

        let speed = Math.max(0.05, altitude/120);

        y += speed;

        landingVikram.style.top = y + "%";

        landingFlame.style.top = (y + 9) + "%";

        landingFlame.style.width =
        Math.max(6, altitude*1.2) + "px";

        orbitLog.innerHTML =
        "Altitude : " + altitude.toFixed(1) + " km";

        if(altitude < 20){

            orbitLog.innerHTML =
            "Rough Braking Phase";

        }

        if(altitude < 10){

            orbitLog.innerHTML =
            "Fine Braking Phase";

        }

        if(altitude < 3){

            orbitLog.innerHTML =
            "Vertical Descent";

        }
        
        if(altitude <= 0){

            clearInterval(descend);

            landingComplete();

        }

    },60);

}

function landingComplete(){

    landingFlame.style.opacity = "0";

    setTimeout(()=>{

        showSuccessScreen();

    },2000);

}

function showSuccessScreen(){

    landingScene.classList.add("hidden");

    successScreen.classList.remove("hidden");

    successScreen.style.display = "flex";

}