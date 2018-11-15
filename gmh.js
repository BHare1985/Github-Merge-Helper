(function() {	
	function rafAsync() {
		return new Promise(resolve => {
			requestAnimationFrame(resolve);
		});
	}

	async function checkElement(selector) {
		while (document.querySelector(selector) === null) {
			await rafAsync()
		}
		return true;
	}  

	function hideAllButtons(){
		document.querySelectorAll(".BtnGroup").forEach(function(el){
			el.style.display = "none";
		});	
	}
	
	function disableAllButtons(){
		document.querySelectorAll("button[name='do']").forEach(function(el){
			el.type = "button";
		});
	}
	
	function enableButton(action){
		document.querySelector("button[value='"+action+"']").type = "submit";
		document.querySelector("button[value='"+action+"']").style.display = "block";	
	}
	
	function showButton(action){
		document.querySelectorAll(".btn-group-" + action).forEach(function(el){
			el.style.display = "block";
		});	
	}
	
	function addMessage(){
		var p = document.createElement('p');
		p.textContent = "The merge button has been automatically changed by Github Merge Helper";

		document.querySelector("div.merge-message").prepend(p);	
	}
	
	checkElement('.BtnGroup') //use whichever selector you want
	.then((element) => {
		var labelExists = document.querySelector(".IssueLabel[title='DontSquash']");
		var action = labelExists ? "merge" : "squash";

		hideAllButtons();
		disableAllButtons();
		enableButton(action);
		showButton(action);
		addMessage();
	});
})();

	
