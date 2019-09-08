(function() {	
	async function checkElement(selector) {
		while (document.querySelector(selector) === null) {
			await new Promise(resolve => {
				requestAnimationFrame(resolve);
			});
		}
		return true;
	}  

	function getButtons(){
		return document.querySelectorAll("[class^='btn-group-']");
	}
	
	function getButton(action){
		return document.querySelectorAll("[class^=btn-group-"+action+"]");
	}

	function enable(elements){
		elements.forEach(function(el){
			el.disabled = false;
			el.type = "submit";
		});
	}
	
	function disable(elements){
		elements.forEach(function(el){
			el.disabled = true;
			el.type = "button";
		});
	}
	
	function click(action){
		document.querySelectorAll("button.select-menu-item[value='"+action+"']").forEach(function(el){ 
			el.click();
        });
	}
	
	function addMessage(action){
		var p = document.createElement('p');
		p.textContent = "The merge button has been set to "+action+" by Github Merge Helper";

		document.querySelector("div.merge-message").prepend(p);	
	}
	
	function execute(){
		if (!window.location.pathname.match(/\/*\/*\/pull\/\d+/gm) ) {
			return;
		}

		checkElement("button[value='squash']")
		.then((element) => {
			var labelExists = document.querySelector(".IssueLabel[title='DontSquash']");
			var action = labelExists ? "merge" : "squash";
			
			var buttons = getButtons();
			var actionButton = getButton(action);
		
			disable(buttons);
			enable(actionButton);
			
			setTimeout(function(){
				click(action);
				addMessage(action);
			}, 200);
		});
	}

	document.addEventListener('pjax:success', function() {
		execute();
	});	
	
	execute();
})();

	