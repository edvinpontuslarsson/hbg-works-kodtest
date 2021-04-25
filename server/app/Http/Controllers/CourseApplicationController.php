<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CourseApplication;

class CourseApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CourseApplication::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request);

        // return $request;
        
        // TODO adjust this to also add participants
        return CourseApplication::create($request->all());

        // TODO can I somehow see what comes in request w. types?
    }
}
