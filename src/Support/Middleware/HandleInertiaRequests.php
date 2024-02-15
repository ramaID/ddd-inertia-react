<?php

namespace Support\Middleware;

use App\Models\User;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var User */
        $user = $request->user();
        $permissions = [];

        if ($user) {
            $cacheKey = 'permissions-'.$user->id;
            $permissions = Cache::has($cacheKey)
                ? Cache::get($cacheKey)
                : Cache::remember($cacheKey, 60 * 60 * 24, fn () => $user->permissions());
        }

        return [
            ...parent::share($request),
            'auth' => compact('user', 'permissions'),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
