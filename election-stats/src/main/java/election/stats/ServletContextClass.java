package election.stats;

import java.sql.SQLException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ServletContextClass implements ServletContextListener {

	public static ConnectDB connectDB = null;

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		try {
			connectDB.closeConnection(); // Closing Database Connection
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void contextInitialized(ServletContextEvent S) {
		// TODO Auto-generated method stub
		connectDB = new ConnectDB(); // Creating Connection
		S.getServletContext().setAttribute("connectDB", connectDB);
		connectDB.createConnection(); // Connecting to Database
	}

}
