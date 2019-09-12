{
	const only = v => document.querySelector(v);
	const all = v => Array.from(document.querySelectorAll(v));

	only(".box1").addEventListener("mousedown",e =>{
		let target = e.target;
		only(".box1").addEventListener("mousemove",e =>{
			let x = e.pageX;
			let y = e.pageY;
		})
	})
	only(".box1").addEventListener("mouseup",e =>{
		console.log("up");
	})
}