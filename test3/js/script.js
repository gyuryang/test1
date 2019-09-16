{
	const only = v => document.querySelector(v);
	const all = v => Array.from(document.querySelectorAll(v));
	
	const input = only(".input input");
	const list = only(".list");
	const liData = localStorage.getItem("liData")==null? new Array() : JSON.parse(localStorage.getItem("liData"));
	
	if(liData.length > 0){
		for(let i=0; i<liData.length; i++){
			list.innerHTML += liData[i];
		}
		only(".footer").style.display = 'block';
		only(".allcheck").innerHTML = "√";
		if(all(".complete").length>0){
			only(".clear_btn").style.display = 'block';
			if(all(".complete").length == liData.length)
				only(".allcheck").style.color = 'black';
		}
		only(".count span").innerHTML = liData.length - all(".complete").length;
	}
	
	console.log(liData);
	document.addEventListener("keyup", e =>{
		let inputval = input.value.trim();
		if(e.keyCode == 13 &&  inputval != "" && e.target.parentNode.className=="input"){
			list.innerHTML += `<li><label class="checkbox"></label><p>${inputval}</p><label class="del">x</label></li>`;
			only(".footer").style.display = 'block';
			input.value = "";
			let count = ~~(only(".count span").textContent);
			count++;
			only(".count span").innerHTML = count.toString();
			only(".allcheck").innerHTML = "√";
			if(only(".selected").classList[0]=='comple_btn') comple_btn();
			liData.push(`<li><label class="checkbox"></label><p>${inputval}</p><label class="del">x</label></li>`);
			setData();
		}else if(e.keyCode == 13 && e.target.parentNode.tagName == "LI"){
			let child = e.target.parentNode.childNodes;
			let target = e.target.previousSibling.previousSibling;
			for(let i=0; i<child.length-1; i++){
				child[i].style.display = 'block';
				if(i==2)
					child[i].style.display = '';
			}
			e.target.parentNode.style.padding = "16px 16px 16px 60px";
			target.innerHTML = e.target.value;
			e.target.remove();
		}
	})
	document.addEventListener("click", e =>{
		let child = all(".list li");
		let compleNode = all(".complete");
		let parentNo = e.target.parentNode.outerHTML;
		switch(e.target.className){
			case "del" :
				for(let i=0; i<liData.length; i++){
					if(liData[i] == parentNo)
						liData.splice(i,1);
				}
				setData();
				let cnt = Number(only(".count span").textContent);
				if(e.target.parentNode.className != " complete") cnt--;
				only(".count span").innerHTML = cnt.toString();
				e.target.parentNode.remove();
				break;
			case "clear_btn" :
				for(let i=0; i<compleNode.length; i++){
					compleNode[i].remove();
				}
				for(let i=0; i<liData.length; i++){
					if(liData[i].indexOf("complete")>0){
						liData.splice(i,1);
						i=-1;
					}
				}	
				if(all(".list li").length == 0){
					only(".allcheck").innerHTML = "";
					only(".allcheck").style.color = 'lightgray';
					only(".footer").style.display = 'none';
				}
				only(".clear_btn").style.display = 'none';
				setData();
				break;
			case "allcheck" :
				let check = e.target.style.color=='black'? true : false;
				e.target.style.color = check==true? 'lightgray' : 'black';
				let checkbox = all(".checkbox");
				for(let i=0; i<child.length; i++){
					check==true? child[i].classList.remove('complete') : child[i].className += " complete";
					checkbox[i].innerHTML = check==true? "" : "√";
					if(liData[i].indexOf('complete') < 0 || check == true){
						let backstr = check==true? liData[i].substring(47) : liData[i].substring(28);
						liData[i] = check==true? '<li><label class="checkbox">'+backstr : '<li class=" complete"><label class="checkbox">√'+backstr;
					}
				}
				setData();
				only(".count span").innerHTML = check==true? child.length.toString() : '0';
				only(".clear_btn").style.display = check==true ? 'none' : 'block';
				if(only(".selected").classList[0]=='comple_btn') comple_btn();
				else if(only(".selected").classList[0]=='all_btn') all_btn();
				else active_btn();
				break;
			case "checkbox" :
				let text = e.target.textContent;
				let newpar = '<li><label class="checkbox">'+parentNo.substring(37);
				console.log(newpar);
				for(let i=0; i<liData.length; i++){
					if(parentNo==liData[i] || newpar == liData[i]){
						let backstr = text==""? liData[i].substring(28) : liData[i].substring(47);
						liData[i] = text==""? '<li class=" complete"><label class="checkbox">√'+backstr : '<li><label class="checkbox">'+backstr;
					}
				}
				setData();
				e.target.innerHTML = text=="" ? "√" : "";
				text == "" ? e.target.parentNode.className += " complete" : e.target.parentNode.classList.remove('complete');
				let count = ~~(only(".count span").textContent);
				text == "" ? count-- : count++;
				only(".count span").innerHTML = count.toString();
				only(".clear_btn").style.display = list.childNodes.length == Number(only(".count span").textContent)? 'none' : 'block';
				only(".allcheck").style.color = child.length>0&&only(".count span").textContent=="0"? 'black' : 'lightgray';
				if(only(".selected").classList[0]=='active_btn') active_btn();
				break;
			case "active_btn" :
			case "active_btn selected" :
				active_btn(true);
				break;
			case "comple_btn" :
			case "comple_btn selected" :
				comple_btn();
				break;
			case "all_btn" :
			case "all_btn selected" :
				all_btn();
				break;
		}
	})
	document.addEventListener("dblclick", e =>{
		if(e.target.parentNode.tagName == "LI"&&e.target.tagName == "P"){
			let text = e.target.textContent;
			let child = e.target.parentNode.childNodes;
			for(let i=0; i<child.length; i++){
				child[i].style.display = 'none';
			}
			e.target.parentNode.style.padding = "0 16px 16px 60px";
			e.target.parentNode.innerHTML += `<input type="text" value="${text}" class="change">`;
		}
	})

	function active_btn(){
		let child = all(".list li");
		let compleNode = all(".complete");
		only(".selected").classList.remove('selected');
		only(".active_btn").classList += " selected";
		for(let i=0; i<child.length; i++){
			child[i].style.display = 'block';
		}
		for(let i=0; i<compleNode.length; i++){
			compleNode[i].style.display = 'none';
		}	
	}

	function comple_btn(){
		let child = all(".list li");
		let compleNode = all(".complete");
		only(".selected").classList.remove('selected');
		only(".comple_btn").classList += " selected";
		for(let i=0; i<child.length; i++){
			child[i].style.display = 'none';
		}
		for(let i=0; i<compleNode.length; i++){
			compleNode[i].style.display = 'block';
		}	
	}

	function all_btn(){
		let child = all(".list li");
		let compleNode = all(".complete");
		only(".selected").classList.remove('selected');
		only(".all_btn").classList += " selected";
		for(let i=0; i<child.length; i++){
			child[i].style.display = 'block';
		}
	}

	function setData(){
		localStorage.setItem("liData",JSON.stringify(liData));
	}
}