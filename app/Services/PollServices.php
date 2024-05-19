<?php


namespace App\Services;


use App\Http\Requests\UpdatePollRequest;
use App\Http\Resources\PollResource;
use App\Models\Poll;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
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
            if(isset($data['image'])){
                $relativePath = $this->saveImage($data['image']);
                $data['image'] = $relativePath;
            }
            if($poll->exists) {
                if($poll->image && isset($data['image'])){

                    $absoulutPath = public_path($poll->image);
                    File::delete($absoulutPath);

                    $poll->image = $data['image'];
                }
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
    private function saveImage($image) {

        // check image for base64
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            $image = substr($image, strpos($image, ',') + 1);

            $type = strtolower($type[1]);

            if(!in_array($type, ['jpg','png','jpeg'])){
                throw new \Exception("wrong image type");
            }
            $image = str_replace(' ','+', $image);

            $image = base64_decode($image);

            if($image == false){
                throw new \Exception("base decode fail");
            }
        }else{
            throw new \Exception("wrong image data");
        }

        $dir = 'images/';
        $file = Str::random().'.'.$type;
        $absoulutPath = public_path($dir);
        $relativePath = $dir.$file;
        if(!File::exists($absoulutPath)){
            File::makeDirectory($absoulutPath, 0755, true);
        }

        file_put_contents($relativePath, $image);

        return $relativePath;
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
