<div class="relative box-login">
    <center><h1>Login here</h1></center>
    <form method="POST" action="<?php echo $_SERVER['REQUEST_URI'] ?>">
        <center><input required="required" class="form-group" type="text" placeholder="Username" name="username" value=""></center>
        <center><input required="required" class="form-group" type="password" placeholder="Password" name="password" value=""></center><br>
        <center><button class="sub-btn" type="submit">Submit</button></center>
    </form>
</div>
<?php
    if(isset($data['error'])) echo "<center><div class='relative error'> ".$data['error']." </div></center>";
