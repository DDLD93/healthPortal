package routes

import (
	"encoding/json"
	"time"

	"net/http"

	"github.com/ddld93/healthApp/users/controller"
	"github.com/ddld93/healthApp/users/model"
	"github.com/ddld93/healthApp/users/utilities"
	"github.com/gorilla/mux"
)

type UserRoute struct {
	UserCtrl *controller.DB_Connect
}

type CustomResponse struct {
	Status     string `json:"status"`
	Message string `json:"message"`
	Payload interface{} `json:"payload"`
	Error error 	`json:"error"`
}
type PaymentResponse struct {
	Message     string `json:"message"`
	Status string `json:"status"`
	User   model.User `json:"user"`
}
type UserCount struct {
	Status     string `json:"status"`
	Message string 		`json:"message"`
	Total int      		`json:"total"`
	Pending int      	`json:"pending"`
	TotalPaid  int 		 `json:"totalPaid"`
}
type UserResponse struct {
	Status string      `json:"status"`
	Message  string     `json:"message"`
	Payload   model.User `json:"payload"`
}



// func (ur *UserRoute) CreateAdmin(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	user := model.User{}
// 	err := json.NewDecoder(r.Body).Decode(&user)
// 	if err != nil {
// 		resp := CustomResponse{Status: err.Error(), Message: "Error Decoding request body"}
// 		json.NewEncoder(w).Encode(resp)
// 		w.WriteHeader(http.StatusInternalServerError)
// 		return
// 	}
// 	validatedUserModel, err := utilities.UserModelValidate(&user)
// 	if err != nil {
// 		resp := CustomResponse{Status:"failed" , Message:err.Error()}
// 		json.NewEncoder(w).Encode(resp)
// 		return
// 	}
// 	// hashing password using Bcrypt
// 	passwordHash, err := utilities.HashPassword(validatedUserModel.Password)
// 	if err != nil {
// 		resp := CustomResponse{Status: "failed", Message: "internal server error"}
// 		json.NewEncoder(w).Encode(resp)

// 		return
// 	}
// 	validatedUserModel.Password = passwordHash
// 	validatedUserModel.Role = "admin"
// 	err = ur.UserCtrl.CreateUser(validatedUserModel)
// 	if err != nil {
// 		resp := CustomResponse{Status: "failed", Message: err.Error()}
	
// 		json.NewEncoder(w).Encode(resp)
// 		return
// 	}
// 	w.WriteHeader(http.StatusOK)
	
	
// 	json.NewEncoder(w).Encode(map[string]string{
// 		"status": "Succuess",
// 		"message": "new account created",
// 	})
// }

func (ur *UserRoute) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	user := model.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		resp := CustomResponse{
			Status:"failed", 
			Message: "Error Decoding request body",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
		return
	}

	validatedUserModel, err := utilities.UserModelValidate(&user)
	if err != nil {
		resp := CustomResponse{
			Status: "failed", 
			Message: "All fields are Required ",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	// hashing password using Bcrypt
	passwordHash, err := utilities.HashPassword(validatedUserModel.Password)
	if err != nil {
		resp := CustomResponse{
			Status: "failed", 
			Message: "Error hashing password",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)

		return
	}
	validatedUserModel.Password = passwordHash
	validatedUserModel.CreatedAt = time.Now()
	err1 := ur.UserCtrl.CreateUser(validatedUserModel)
	if err1 != nil {
		resp := CustomResponse{
			Status: "failed", 
			Message: err1.Error(),
			Error: err1,
		}
	
		json.NewEncoder(w).Encode(resp)
		return
	}
	
	json.NewEncoder(w).Encode(map[string]string{
		"status": "Success",
		"message": "new account created",
	})
}

func (ur *UserRoute) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	user := model.User{}
	err := json.NewDecoder(r.Body).Decode(&user)

	if err != nil {
		resp := CustomResponse{
			Status:"failed", 
			Message: "Error Decoding request body",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	if len(user.Email) <= 0 || len(user.Password) <= 0{
		resp := CustomResponse{Status:"failed", Message: "Email or Password field cannot be empty"}
		json.NewEncoder(w).Encode(resp)
		return
	}
	regUser, err := ur.UserCtrl.GetUser(user.Email)

	if err != nil {
		 resp := CustomResponse{
			 Status:"failed", 
			 Message: "A user with that email dont exist",
			 Error: err,
			}
		json.NewEncoder(w).Encode(resp)
		return
	}
	//comparing password
	isValid := utilities.CheckPasswordHash(user.Password, regUser.Password)
	if !isValid {
		resp := CustomResponse{
			Status: "failed", 
			Message: "wrong password input",
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	regUser.Password = ""
	response := UserResponse{
		Status: "success",
		Message: "Login successiful",
		Payload: *regUser,
	}
	json.NewEncoder(w).Encode(response)	
 }

func (ur *UserRoute) GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	regUser, err := ur.UserCtrl.GetUsers()
	if err != nil {
		resp := CustomResponse{
			Status: "failed", 
			Message: "Error getting request from database",
			Error: err,
				}
		json.NewEncoder(w).Encode(resp)
	}
	json.NewEncoder(w).Encode(regUser)

}

func (ur *UserRoute) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	params := mux.Vars(r)
	email := params["email"]
	user, err := ur.UserCtrl.GetUser(email)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		resp := CustomResponse{Status: "failed", Message: "Not authorize to make such request"}
		json.NewEncoder(w).Encode(resp)
	}
	user.Password = ""
	response := UserResponse{
		Status: "success",
		Message: "User retrieved successfull",
		Payload: *user,}
	json.NewEncoder(w).Encode(response)

}

func (ur *UserRoute) Verify(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	params := mux.Vars(r)
	reference := params["reference"]
	userEmail := params["email"]
	err := utilities.VerifyPayment(reference)
	if err != nil {
		resp := CustomResponse{
			Status:     "failed",
			Message: "Payment not verfied",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
	return
	}
	payment := model.PaymentInfo{
		Reference: reference,
		Channel: "paystack",
	}
	err = ur.UserCtrl.UpdatePayment(userEmail,payment)
	if err != nil {
		resp := CustomResponse{
			Status:     "failed",
			Message: "didnt updated user status",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	user,err := ur.UserCtrl.GetUser(userEmail)
	if err != nil {
		resp := CustomResponse{
			Status:     "failed",
			Message: "Something went wrong",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
		return
	}
	user.Password = ""

	json.NewEncoder(w).Encode(PaymentResponse{
		Message: "Payment successfull",
		Status: "Success",
		User: *user,
	})

}
func (ur *UserRoute) GetUsersAnalytics(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	User, _ := ur.UserCtrl.GetUsers()
	paidUser, err := ur.UserCtrl.GetPaidUsers()
	if err != nil {
		resp := CustomResponse{Status: "failed", 
		Message: "Not authorize to make such request",
		Error: err,
	}
		json.NewEncoder(w).Encode(resp)
	}
	resp:= UserCount{
		Status: "success",
		Message: "User analytics ",
		Total: len(*User),
		TotalPaid: len(*paidUser),
		Pending:len(*User)- len(*paidUser),
	}
	json.NewEncoder(w).Encode(resp)

}

func (ur *UserRoute) FormFlag(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	params := mux.Vars(r)
	email := params["email"]

	err := ur.UserCtrl.UpdateForm(email)
	if err != nil {
		
		resp := CustomResponse{
		Status: "failed", 
		Message: "Error toggling form flag",
		Error: err,
	}
		json.NewEncoder(w).Encode(resp)
	}
	resp := CustomResponse{Status: "success", Message: "user submission status updated"}
	json.NewEncoder(w).Encode(resp)

}

func (ur *UserRoute) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Add("Content-Type", "application/json")
	params := mux.Vars(r)
	id := params["id"]
	err := ur.UserCtrl.DeleteUser(id)
	if err != nil {
		resp := CustomResponse{
			Status: "failed", 
			Message: "Error deleting user from database",
			Error: err,
		}
		json.NewEncoder(w).Encode(resp)
	}
	
	response := UserResponse{
		Status: "success",
		Message: "User deleted successfull",
		
	}
	json.NewEncoder(w).Encode(response)

}