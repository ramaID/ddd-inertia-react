<?php

namespace App\Data;

use App\Models\User;
use Spatie\LaravelData\Attributes\DataCollectionOf;
use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Unique;
use Spatie\LaravelData\Support\Validation\References\RouteParameterReference;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
final class UserData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        #[Unique(User::class, 'email', ignore: new RouteParameterReference('user', 'id', true))]
        public string $email,
        #[Confirmed]
        public ?string $password,
        #[DataCollectionOf(RoleData::class)]
        public array $roles,
    ) {
    }

    public static function fromModel(User $user): self
    {
        $roles = [];

        foreach ($user->roles as $role) {
            $roles[] = RoleData::from($role);
        }

        return new self(
            $user->id,
            $user->name,
            $user->email,
            null,
            $roles,
        );
    }
}
