<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::resource('users', \App\Http\Controllers\UsersController::class)->except(['show']);
