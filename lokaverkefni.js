fetch('https://apis.is/concerts')
.then(response => response.json())
.then(data => obj = data)
.then(() => AdalLoop())

function AdalLoop(){
	count = 0;
	for(key in obj.results) {
    	count++;
	}

	let cache = [];
	let images = new Array(count);

	for(let i=0;i<count;i++)
	{ 
		images[i] = new Image();
		images[i].src = obj.results[i].imageSource; 
		images[i].alt = obj.results[i].eventDateName;
		images[i].data = obj.results[i].eventHallName;
    console.log(images[i]);

    let date = new Date(obj.results[i].dateOfShow);
    let newDate = date.getDate() + "/"  + date.getMonth() + " Kl: " + date.getHours();
    if (date.getMinutes() >= 10)
    {
      newDate += ":" + date.getMinutes();
    }
    if (date.getMinutes() <= 9)
    {
      newDate += ":0" + date.getMinutes();
    }
    let div = document.createElement("div");
    div.setAttribute("id", i);
    let text1 = document.createElement('p');
    text1.innerHTML = obj.results[i].eventDateName;
    let text2 = document.createElement('p');
    text2.innerHTML = obj.results[i].eventHallName;
    let text3 = document.createElement('p');
    text3.innerHTML = newDate;
		let img = document.getElementById("gallery").appendChild(images[i]);
		div.appendChild(text1);
    div.appendChild(text2);
    div.appendChild(text3);
		div.appendChild(img);
		document.getElementById("gallery").appendChild(div);

		cache.push({                         
      		element: images[i],                      
      		eventName: images[i].alt.trim().toLowerCase(),
          eventPlace: images[i].data.trim().toLowerCase(),
          divId: i
    });        
	}
	function filterByName() {                     
    let query = this.value.trim().toLowerCase(); 
    cache.forEach(function(img) {         
      	let index = 0;                
      	if (query) {                        
        	index = img.eventName.indexOf(query); 
      	}
        if (index === -1)
        {
          document.getElementById(img.divId).style.display = "none";
        }
        else if (index !== -1)
        {
          document.getElementById(img.divId).style.display = "";
        }
    	});
  }
  function filterByPlace() {                     
    let query = this.value.trim().toLowerCase(); 
    cache.forEach(function(img) {         
        let index = 0;                
        if (query) {                        
          index = img.eventPlace.indexOf(query); 
        }
        if (index === -1)
        {
          document.getElementById(img.divId).style.display = "none";
        }
        else if (index !== -1)
        {
          document.getElementById(img.divId).style.display = "";
        }
      });
  }
  	let searchByName = document.getElementById('filter-search-by-name');
    let searchByPlace = document.getElementById('filter-search-by-place');
  	searchByName.addEventListener("input", filterByName);
  	searchByName.addEventListener("keyup", filterByName); 
    searchByPlace.addEventListener("input", filterByPlace);
    searchByPlace.addEventListener("keyup", filterByPlace); 
}

