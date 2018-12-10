fetch('https://apis.is/concerts')
.then(response => response.json())
.then(data => obj = data)
.then(() => kalli())

function kalli(){
	count = 0;
	for(key in obj.results) {
    	count++;
	}

	var cache = [];
	var tagged = {};
	let images = new Array(count);
	let texts = new Array(count);

	for(let i=0;i<count;i++)
	{ 
		images[i] = new Image();
		images[i].src = obj.results[i].imageSource; 
		images[i].alt = obj.results[i].eventDateName;
		images[i].data = obj.results[i].eventDateName;
		images[i].textContent = obj.results[i].eventDateName;

    	var div = document.createElement("div");
    	div.setAttribute("id", i);
    	var z = document.createElement('p'); // is a node
		z.innerHTML = images[i].textContent;
		var img = document.getElementById("gallery").appendChild(images[i]);
		div.appendChild(z);
		div.appendChild(img);
		document.getElementById("gallery").appendChild(div);

		cache.push({                         
      		element: images[i],                      
      		text: images[i].alt.trim().toLowerCase(),
          holf: i
    	});          
    	if (images[i].data) {                                  
      		images[i].data.split(',').forEach(function(tagName) {
        		if (tagged[tagName] == null) {            
          			tagged[tagName] = [];                   
        		}
        		tagged[tagName].push(images[i]);          
      		});
    	}
	}
	function filter() {                     
    var query = this.value.trim().toLowerCase(); 
    cache.forEach(function(img) {         
      	var index = 0;                
      	if (query) {                        
        	index = img.text.indexOf(query); 
      	}
        if (index === -1)
        {
          img.element.style.display = 'none';
          document.getElementById(img.holf).style.display = "none";
        }
        else if (index !== -1)
        {
          img.element.style.display = '';
          document.getElementById(img.holf).style.display = "";
        }
        //document.getElementById("1").style.visibility = "hidden";
      	//img.element.style.display = index === -1 ? 'none' : '';   
    	});
  	}
  	let search = document.getElementById('filter-search');
  	search.addEventListener("input", filter);
  	search.addEventListener("keyup", filter); 
}

