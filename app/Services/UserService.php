<?php


namespace App\Services;


use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function StoreNewUser($data){

        /** @var \App\Models\User $user **/
        $user = User::create([
            'name'=>$data['full_name'],
            'email'=>$data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $token =  $this->GetTokenUser($user);
        return [
            'user' => $user,
            'token' => $token
        ];
    }
    public  function GetTokenUser(User $user){
        $token =  $user->createToken('main')->plainTextToken;

        return $token;
    }

    public function isAuth($credentials, $remember) {

        if(!Auth::attempt($credentials, $remember)) {
            return false;
        }
        return  Auth::user();
    }
//    public function AuthUser() {
//        $user =
//        return $user;
//    }
}
