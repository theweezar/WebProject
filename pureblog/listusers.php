<?php 
    include "layout.php";
    if ($_SESSION['func']!='admin' || !isset($_SESSION['logged'])) header("Location: forbidden.html");
?>
<title>List Users</title>
<div class="relative list-box">
    <table>
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Password</th>
            <th>Function</th>
            <th>Fullname</th>
        </tr>
        <?php 
            $result = mysqli_query($conn,"SELECT * FROM users");
            for($i=0; $i<mysqli_num_rows($result); $i++){
                $data = mysqli_fetch_assoc($result);
                echo "<tr>";
                echo "<td style='text-align:center'>".$data['id']."</td>";
                echo "<td>".$data['username']."</td>";
                echo "<td>".$data['password']."</td>";
                echo "<td>".$data['func']."</td>";
                echo "<td>".$data['fullname']."</td>";
                echo "</tr>";
            }
        ?>
    </table>
</div>