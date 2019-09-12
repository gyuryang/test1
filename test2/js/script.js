{
	const only = v => document.querySelector(v);
	const all = v => Array.from(document.querySelectorAll(v));
	let thisbox;
	document.addEventListener("mousedown",e =>{
		thisbox = e.target.className;
		let startX = e.offsetX;
		let startY = e.offsetY;
		window.addEventListener("mousemove",e =>{
			let x = e.clientX-startX;
			let y = e.clientY-startY;
			only("."+thisbox).style = `position:absolute; left : ${x}px; top : ${y}px;`;
		}, false)
	})
	document.addEventListener("mouseup",e =>{
		console.log("up");
	})
}