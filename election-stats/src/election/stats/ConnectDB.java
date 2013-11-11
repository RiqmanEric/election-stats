package election.stats;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectDB {
	
	public Connection conn = null;
	
	public ConnectDB() {}
	
	public void createConnection() {
		try{
	        Class.forName("org.postgresql.Driver");
	    } catch (ClassNotFoundException cnfe){
	        System.out.println("Could not find the JDBC driver!");
	        System.exit(1);
	    }
	    //Enter the connection details
		String hostname = "localhost";
		String username = "elecstat"; 
		String password = "elecstat"; 
		String dbName = "election_stats_india";
		String connectionUrl = "jdbc:postgresql://" + hostname +  "/" + dbName;
		
		//Connect to the database
		try {
		   conn = (Connection) DriverManager.getConnection(connectionUrl,username, password);
		   System.out.println("Connected successfullly");
		   
		} catch (SQLException sqle) {
			System.out.println("Connection failed");
			System.out.println(sqle);
			System.exit(1);
		}
	}
	
	public void closeConnection() throws SQLException {
		System.out.println("Connection closed successfullly");
		conn.close();
	}
}
