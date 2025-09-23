<!DOCTYPE html>
<html>
<head>
    <title>Rock Paper Scissors</title>
</head>
<body>
    <h1>Rock Paper Scissors</h1>

<?php if(isset($result)): ?>
    <p>You played <?php echo e($player_choice); ?></p>
    <p>Computer played <?php echo e($computer_choice); ?></p>
    <p>You <?php echo e($result); ?>!</p>
<?php endif; ?>

<form method="POST" action="<?php echo e(route('game.play')); ?>">
    <?php echo csrf_field(); ?>
    <label for="rock">Rock</label>
    <input type="radio" name="choice" id="rock" value="rock"><br>
    <label for="paper">Paper</label>
    <input type="radio" name="choice" id="paper" value="paper"><br>
    <label for="scissors">Scissors</label>
    <input type="radio" name="choice" id="scissors" value="scissors"><br>
    <button type="submit">Play</button>
</form>
</body>
</html>
<?php /**PATH /Users/ziik/myapp/resources/views/game.blade.php ENDPATH**/ ?>