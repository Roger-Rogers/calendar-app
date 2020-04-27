<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CalendarController extends Controller
{
    public function UserAvailibility (Request $request) {

        $availibility = DB::table('availability')->get()->where('email', $request->email);
        return response()->json($availibility);
    }
}
