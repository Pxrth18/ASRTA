const counters = document.querySelectorAll(".counter");

const speed = 200;

counters.forEach(counter => {

    const updateCount = () => {

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / speed;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCount,10);

        }

        else{

            counter.innerText = target;

        }

    }

    updateCount();

    

    const stars = document.getElementById("stars");

      for(let i=0;i<100;i++){

    const star=document.createElement("div");

    star.className="star";

    star.style.left=Math.random()*100+"vw";

    star.style.top=Math.random()*100+"vh";

    star.style.animationDelay=Math.random()*5+"s";

    star.style.animationDuration=(2+Math.random()*4)+"s";

    stars.appendChild(star);

    }

    // parallax effect.

    document.addEventListener("mousemove", (e) => {

    const x = (e.clientX - window.innerWidth / 2) / 80;
    const y = (e.clientY - window.innerHeight / 2) / 80;

    document.querySelectorAll(".star").forEach((star, index) => {

        const speed = (index % 5 + 1) * 0.08;

        star.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

  });

}
);