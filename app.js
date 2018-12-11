fetch('https://apis.is/concerts')// saekir gogn
.then(response => response.json())
.then(data => obj = data)// laetur gogn i obj
.then(() => AdalLoop())// fer i Adaloop

function AdalLoop(){
	count = 0;// teljari 
	for(key in obj.results) // telur alla tonleika
  {
    count++;// haekkar teljarann
	}

	let cache = [];// aukafylki
	let images = new Array(count);

	for(let i=0;i<count;i++)// for loop sem fer upp i fjolda tonleika
  { 
		images[i] = new Image();// byr til image object og laetur i hvert holf a fylkinu images
		images[i].src = obj.results[i].imageSource;// naer i upplysingar af netinu um imageSource og laetur inn i fylkið sem .src
		images[i].alt = obj.results[i].eventDateName;// naer i upplysingar af netinu um eventDateName og laetur inn i fylkið sem .alt
		images[i].data = obj.results[i].eventHallName;// naer i upplysingar af netinu um eventHallName og laetur inn i fylkið sem .data

    let date = new Date(obj.results[i].dateOfShow);//þetta er bara fljotlega buinn til koði til að breyta date ur YYYYMMDDTHHMMSS í taeginlegt DD/MM kl: HH:MM
    let newDate = date.getDate() + "/"  + date.getMonth() + " Kl: " + date.getHours();
    if (date.getMinutes() >= 10)
    {
      newDate += ":" + date.getMinutes();
    }
    if (date.getMinutes() <= 9)
    {
      newDate += ":0" + date.getMinutes();
    }

    let div = document.createElement("div");// byr til div i html
    div.setAttribute("id", i);// setur id a div sem teljarann

    let text1 = document.createElement('p');// byr til paragraph
    text1.innerHTML = obj.results[i].eventDateName; //laetur textann i paragraphinu vera Heiti tonleikanna
    div.appendChild(text1);// laetur paragraphid inn i div

    let text2 = document.createElement('p');// byr til paragraph
    text2.innerHTML = obj.results[i].eventHallName;//laetur textann i paragraphinu vera Heiti stadsetningu tonleikanna
    div.appendChild(text2);// laetur paragraphid inn i div

    let text3 = document.createElement('p');// byr til paragraph
    text3.innerHTML = newDate;//laetur textann i paragraphinu vera dagsetning tonleikanna
    div.appendChild(text3);// laetur paragraphid inn i div
		
    let img = document.getElementById("gallery").appendChild(images[i]);// baetir myndum inn i div gallery
		div.appendChild(img);// laetur myndir i div

		document.getElementById("gallery").appendChild(div);// laetur div inn i div gallery

		cache.push({                         
      		element: images[i], //laetur myndir ur images array inn i array cache.element                      
      		eventName: images[i].alt.trim().toLowerCase(), // laetur images.alt i cache.eventName
          eventPlace: images[i].data.trim().toLowerCase(), // laetur images.data i cache.eventPlace
          divId: i// laetur inn teljarann i inn i cache.divId, vegna tess ad divin fyrir hverja mynd heita eftir teljaranum
    });        
	}
	function filterByName() {                     
    let query = this.value.trim().toLowerCase(); 
    cache.forEach(function(img) {  // loopar gegnum img elements i cache arrayinu       
      	let index = 0;            
      	if (query) {                       
        	index = img.eventName.indexOf(query); //ber query input saman vid eventName textann
      	}
        if (index === -1)// index element verdur -1 tegar ehv matchar ekki search
        {
          document.getElementById(img.divId).style.display = "none";// laetur div sem passar ekki vid query hverfa
        }
        else if (index !== -1) // else setning basically
        {
          document.getElementById(img.divId).style.display = "";// birtir div aftur ef tad var latid hverfa og passar nuna vid query
        }
    	});
  }
  function filterByPlace() {                     
    let query = this.value.trim().toLowerCase(); 
    cache.forEach(function(img) {      // loopar gegnum img elements i cache arrayinu       
        let index = 0;                
        if (query) {                        
          index = img.eventPlace.indexOf(query); //ber query input saman vid eventPlace textann
        }
        if (index === -1)// index element verdur -1 tegar ehv matchar ekki search
        {
          document.getElementById(img.divId).style.display = "none";// laetur div sem passar ekki vid query hverfa
        }
        else if (index !== -1)// else setning basically
        {
          document.getElementById(img.divId).style.display = "";// birtir div aftur ef tad var latid hverfa og passar nuna vid query
        }
      });
  }
  	let searchByName = document.getElementById('filter-search-by-name');// naer i search by name filterinn 
    let searchByPlace = document.getElementById('filter-search-by-place');// naer i search by place filterinn 
  	searchByName.addEventListener("input", filterByName);// hlustar eftir input og fer inn i filterByName functionid
  	searchByName.addEventListener("keyup", filterByName); // hlustar eftir keyup og fer inn i filterByName functionid
    searchByPlace.addEventListener("input", filterByPlace);// hlustar eftir input og fer inn i filterByPlace functionid
    searchByPlace.addEventListener("keyup", filterByPlace); // hlustar eftir keyup og fer inn i filterByPlace functionid
}
