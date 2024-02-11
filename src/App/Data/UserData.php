<?php

namespace App\Data;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
final class UserData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public ?int $id,
        public string $name,
        public string $email,
        public ?string $password,
    ) {
    }
}
