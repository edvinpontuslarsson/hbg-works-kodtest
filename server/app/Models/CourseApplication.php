<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'companyEmail',
        'companyName',
        'companyPhone',
        'courseDate',
        'courseName',
        'courseId',
    ];
}
