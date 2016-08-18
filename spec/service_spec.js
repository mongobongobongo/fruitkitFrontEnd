
describe("Order service", function(){

	var service;
	//beforeEach(module('fruitkit'));
	//beforeEach(function(){
		//module('fruitkit.fruitkitServices');
	//});

	beforeEach(inject(function(_weekdayToNumber_){
		service = _weekdayToNumber_;
	}));

	it("shoid", function(){
		expect(service).toBeDefined();
	});
	
});