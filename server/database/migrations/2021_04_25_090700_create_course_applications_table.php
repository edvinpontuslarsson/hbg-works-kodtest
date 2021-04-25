<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseApplicationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_applications', function (Blueprint $table) {
            // companyEmail: ""
            // companyName: ""
            // companyPhone: ""
            // courseDate: "2021-01-01"
            // courseName: "Yoga 101"
            // courseId: 1
            
            $table->id();
            $table->string('companyEmail');
            $table->string('companyName');
            $table->string('companyPhone');
            $table->string('courseDate');
            $table->string('courseName');

            $table->integer('courseId');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_applications');
    }
}
