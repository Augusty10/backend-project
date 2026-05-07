import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError}  from "../utils/ApiError.js";
import {User} from "../models/user.model.js" ;
import {uploadOnCloudinary} from "../utils/cloudnary.js";
import {ApiResponse} from "../utils/ApiResponse.js" 



const registerUser = asyncHandler(async (req, res) => {
// get user deatils from frontend 
// validation of user details  - not empty 
// check if user already exisita in database : username or email 
// check for images , check for avatar image 
// upload them to cloudinary and get the url , avatar 
// Crete user Objacet ans - crete entry in db
// remove password and refresh token field from response 
// check for user creataion 
// return response  

 const {fullName, email, username, password} = req.body;
console.log(" email : ", email);

   if(
    [fullName , email, username, password].some((field )=>
    field?.trim()=== "")
   ){
      throw new ApiError(400, " All feilds are required ")
   }
 
 
 const existedUser =  User.findOne({
    $or: [{username },{email}]

 })

  if(existedUser){
         throw new ApiError(409, " User with email or username alreday exists ")
  }

 const  avatrLocalPath = req.files?.avatar[0]?.path;
 const  coverImageLocalPath = req.file?.coverImage[0]?.path;

 if(!avatrLocalPath){
    throw new ApiError(400, " Avatar file is required ")
 }


const avatar = await  uploadOnCloudinary(avatrLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
        throw new ApiError(400, " Avatar file is required ")
}
  const user =  await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase()
})
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500," Something went wrong on regestring a user " )

  }
 return res.status(201).json(
      new ApiResponse(200, createdUser," User registerd Succesfully " )
 )


})


export { registerUser} 
