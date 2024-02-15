<?php

namespace App\Data;

use App\Enums\RoleName;

#[\Spatie\TypeScriptTransformer\Attributes\TypeScript]
final class RoleData extends \Spatie\LaravelData\Data
{
    public function __construct(
        public ?string $id,
        public string|RoleName $name,
    ) {
    }
}
