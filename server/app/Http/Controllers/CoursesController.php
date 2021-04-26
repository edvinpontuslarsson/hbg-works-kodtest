<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Courses\FileReader;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return file_get_contents(storage_path("kurser/kurser.json"), "r");
    }
}
