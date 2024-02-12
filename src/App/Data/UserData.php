<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\Validation\Confirmed;
use Spatie\LaravelData\Attributes\Validation\Unique;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
final class UserData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        #[Unique('users', 'email')]
        public string $email,
        #[Confirmed]
        public ?string $password,
    ) {
    }
}
