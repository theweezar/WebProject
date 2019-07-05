<?php 
    include "layout.php";
    if (isset($_SESSION['logged'])) header("Location: home.php");
?>
<form class="absolute form-login" method="POST" action="login.php">
    <center>
        <div style="font-size:30px; padding:10px 10px; font-family: 'Montserrat', sans-serif;">Login Here</div>
    </center>
    <div>
        <input class="form-group" type="text" name="username" value="" placeholder="Username" required="required">
    </div>
    <div>
        <input class="form-group" type="password" name="password" value="" placeholder="Password" required="required">
    </div>
    <center>
    <div>
        <input class="btn sub-btn" name="submit" type="submit" value="Login">
    </div>
    <?php
        function CheckInput($string){
            $string = trim($string);
            $string = stripslashes($string);
            $string = htmlspecialchars($string);
            return $string;
        }
        
        if (isset($_POST['username']) && isset($_POST['password'])){
            $curr_uname = CheckInput($_POST['username']);
            $curr_pwd = hash("md5",CheckInput($_POST['password']),false);
            $result = mysqli_query($conn,"SELECT * FROM users WHERE username = '".$curr_uname."' ;");
            $data = mysqli_fetch_assoc($result);
            if (isset($data)){
                if ($curr_uname==$data['username'] && $curr_pwd==$data['password']){
                    $_SESSION['logged'] = true;
                    $_SESSION['username'] = $curr_uname;
                    $_SESSION['func'] = $data['func'];
                    header("Location: posts.php");
                }
                else{
                    echo "<p class='error'>*Wrong username or password!<p>";
                }
            }
            else{
                echo "<p class='error'>*Wrong username or password!<p>";
            }
            unset($curr_uname); unset($curr_pwd);
        }
    ?>
    </center>
</form>
