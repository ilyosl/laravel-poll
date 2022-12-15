<?php


namespace App\Services;


use App\Http\Requests\UpdatePollRequest;
use App\Http\Resources\PollResource;
use App\Models\Poll;
use App\Models\User;

class PollServices
{
    public function listPollsByUser($user) {

        $polls = Poll::where('user_id', $user->id)->paginate();

        return PollResource::collection($polls);
    }
    public function showPoll(User $user, Poll $poll) {
        if($this->checkAccessUser($user, $poll)){
            return new PollResource($poll);
        }else{
            return abort(403, "Unauthorized action");
        }
    }

    public function createUpdatePoll($request, $poll){
        $data = $request->validated();

        try {
            if($poll->exists) {
                $poll->update($data);
                return  $poll;
            }
            else {
                return $poll->create($data);
            }
        }
        catch (\Exception $e){
            abort(403, $e);
        }
    }
    public function createPoll(){

    }
    public function checkAccessUser(User $user, Poll $poll) {
        if($user->id !== $poll->user_id){
            return false;
        }
        return true;
    }

    public function destroyPoll(User $user, Poll $poll) {
        if($this->checkAccessUser($user, $poll)){
            try {
                $poll->delete();
            }
            catch (\Exception $e) {
                abort(204, $e );
            }
        }else{
            return abort(403, "Unauthorized action");
        }
    }
}
