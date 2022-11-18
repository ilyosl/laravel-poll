<?php


namespace App\Http\Controllers;


use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(RegisterUserRequest $request, UserService $service){
        $user = $service->StoreNewUser($request->validated());
        return response($user);
    }
    public function login(LoginUserRequest $request, UserService $service){

        $credentials = $request->validated();
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if(!($user = $service->isAuth($credentials, $remember))){
            return response([
                'error' => 'Credentials are not correct'
            ], 422);
        }
        $token = $service->GetTokenUser($user);

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    public function logout()
    {
        /** @var User $user **/
        $user = Auth::user();

        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
