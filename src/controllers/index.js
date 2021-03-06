import express from 'express';
import UserService from "../services/UserService";
import  User    from    "../models/User";

/**declare variable */
let router = express.Router();
let userService=new UserService();

/**home */

router.get("/", (req, res) => {
	let method="controllers/home";
	console.log(method+" ===>start");

	res.redirect("/user/list");
});

/**
 * user manager
 */
router.get("/user/list", async(req, res) => {
	let method="controller/list";
	console.log(method+" ===>start");

	let result;
	try {
		result=await userService.getAll();
		/* console.log("list="+JSON.stringify(result)); */

		if(result.status=="success"){
			console.log(method+" -->success");
			res.render("list", { title: "User List", users:result.data });
		}else{
			console.log(method+" -->failed from the api");
			res.render("list", { title: "User List", users:result });
		}		
		
	} catch (error) {
		res.render("list", { title: "User List", users:result });
	}

});

router.get("/user/add",(req,res)=>{
	let method="controller/user/add";
	console.log(method+" ===>start");

	try {
		console.log(method+" -->success");
		res.render("form_add",{title:"add User"});
	} catch (error) {
		console.log(method+" -->fail");
	}
});

router.post("/user/add",async(req,res)=>{
	let method="controller/user/add";
	console.log(method+" ===>start");

	req.checkBody("username", "Username is required").notEmpty();
	req.checkBody("email", "Email is required").notEmpty();
	req.checkBody("phone", "Phone is required").notEmpty();
	
	let user=new User(null,req.body.username,req.body.email,req.body.phone);
	let errors = req.validationErrors();
	if (errors) {
		res.render("form_add", { title: "add User", errors: errors });
	} else {

		try {
			let result=await userService.insert(user);

			if(result.status=="success"){
				console.log(method+" -->success");
				res.redirect("/user/list");
			}else{
				console.log(method+" -->failed from api");
				res.render("form_add", { title: "add User"});			
			}

		} catch (error) {
			console.log(method+" -->fail");
			res.render("form_add", { title: "add User"});			
		}
	}	
});

router.get("/user/update/:_userID",async(req,res)=>{
	let method="Controller/user/update";
	console.log(method+" ===>start");

	try {
		let result= await userService.getUserByID(req.params._userID);

		if(result.status=="success"){
			console.log(method+" -->success"+JSON.stringify(result));
			res.render("form_edit", { title: "Edit User",user:result.data});	
		}else{
			console.log(method+" -->failed from api");
			res.render("form_edit", { title: "Edit User",user:null});
		}

	} catch (error) {
		console.log(method+" -->fail");
		res.render("form_edit", { title: "Edit User",user:null});				
	}
});

router.post("/user/update/:_userID",async(req,res)=>{
	let method="Controller/user/update";
	console.log(method+" ===>start");

	try {
		let user=new User(req.params._userID,req.body.username,req.body.email,req.body.phone);
		let result= await userService.update(user);

		if(result.status=="success"){
			console.log(method+" -->success");
			res.redirect("/user/list");
		}else{
			console.log(method+" -->failed from api");
			res.redirect("/user/list");			
		}
		
	} catch (error) {
		console.log(method+" -->fail");
		res.redirect("/user/list");			
	}
});

router.get("/user/delete/:_userID",async(req,res)=>{
	let method="Controller/user/delete";
	console.log(method+" ===>start");

	try {
		let result= await userService.delete(req.params._userID);
		
		if(result.status=="success"){
			console.log(method+" -->success");
			res.redirect("/user/list");
		}else{
			console.log(method+" -->failed from api");
			res.redirect("/user/list");			
		}
		
	} catch (error) {
		console.log(method+" -->failed");
		res.redirect("/user/list");			
	}
});

router.post("/user/search", async(req, res) => {
	let method="controller/list";
	console.log(method+" ===>start");

	let result;
	try {
		result=await userService.getUserByName(req.body.keyword);

		if(result.status=="success"){
			console.log(method+" -->success");
			res.render("list", { title: "User List", users:result.data});
		}else{
			console.log(method+" -->failed from api");
			res.render("list", { title: "User List",users:result });
		}
		
	} catch (error) {
		console.log(method+" -->fail");
		res.render("list", { title: "User List",users:result });
	}

});

/**export */
module.exports = router;