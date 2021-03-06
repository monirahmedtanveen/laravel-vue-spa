<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function addTag(Request $request){
        $this->validate($request, [
            'tagName' => 'required',
        ]);

        return Tag::create([
            'tagName' => $request->tagName,
        ]);
    }

    public function editTag(Request $request){
        $this->validate($request, [
            'id' => 'required',
            'tagName' => 'required',
        ]);

        return Tag::where('id', $request->id)->update([
            'tagName' => $request->tagName,
        ]);
    }

    public function deleteTag(Request $request){
        $this->validate($request, [
            'id' => 'required',
        ]);

        return Tag::where('id', $request->id)->delete();
    }

    public function getTags(){
        return Tag::orderBy('id', 'DESC')->get();
    }

    public function upload(Request $request){
        $this->validate($request, [
            'file' => 'required|mimes:jpg,jpeg,png',
        ]);

        $picName = time() . '.' . $request->file->extension();
        $request->file->move('uploads', $picName);

        return $picName;
    }

    public function deleteImage(Request $request){
        $fileName = $request->imageName;
        $this->deleteFileFromServer($fileName);
        return 'done';
    }

    public function deleteFileFromServer($fileName){
        $filePath = public_path() . '/uploads/' . $fileName;
        if (file_exists($filePath)) {
            @unlink($filePath);
        }
        return;
    }

    public function addCategory(Request $request){
        $this->validate($request, [
            'categoryName' => 'required',
            'iconImage' => 'required',
        ]);

        return Category::create([
            'categoryName' => $request->categoryName,
            'iconImage' => $request->iconImage,
        ]);
    }

    public function getCategories(){
        return Category::orderBy('id', 'DESC')->get();
    }
}
