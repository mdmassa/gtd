<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = [
        'user_id',
        'content',
        'status',
        'estimated_minutes',
        'scheduled_day',
        'scheduled_order',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
